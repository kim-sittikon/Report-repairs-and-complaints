<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserActivityLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_id',
        'activity_type',
        'ip_address',
        'user_agent',
    ];

    /**
     * Relationship to Account
     */
    public function account()
    {
        return $this->belongsTo(Account::class, 'account_id', 'account_id');
    }
}
