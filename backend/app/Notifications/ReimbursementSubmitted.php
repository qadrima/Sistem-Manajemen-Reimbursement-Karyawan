<?php

namespace App\Notifications;

use App\Models\Reimbursement;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ReimbursementSubmitted extends Notification implements ShouldQueue
{
    use Queueable;

    protected $reimbursement;

    public function __construct(Reimbursement $reimbursement)
    {
        $this->reimbursement = $reimbursement;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('New Reimbursement Submission')
            ->line('A new reimbursement has been submitted by: ' . $this->reimbursement->user->name)
            ->line('Title: ' . $this->reimbursement->title)
            ->line('Amount: Rp ' . number_format($this->reimbursement->amount, 0, ',', '.'))
            ->action('View Details', url('/'))
            ->line('Please review and take necessary action.');
    }
}
