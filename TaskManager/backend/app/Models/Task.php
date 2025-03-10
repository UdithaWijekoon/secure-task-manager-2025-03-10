<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    // Attributes
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'status',
    ];

    // relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
