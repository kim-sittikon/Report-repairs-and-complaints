<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $table = 'room';
    protected $primaryKey = 'room_id';
    protected $fillable = ['room_name', 'building_id', 'account_id'];

    public function building()
    {
        return $this->belongsTo(Building::class, 'building_id');
    }

}
