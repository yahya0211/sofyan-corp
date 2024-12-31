<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Books extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['title', 'author', 'publisher', 'status'];

    public function member(){
        return $this->belongsTo(Member::class, 'member_id', 'id');
    }
}
