<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Building extends Model
{
    protected $table = 'building';
    protected $primaryKey = 'building_id';
    protected $fillable = ['building_name', 'account_id'];

    public function rooms()
    {
        return $this->hasMany(Room::class, 'building_id');
    }

    public function requestsRepair()
    {
        return $this->hasMany(RequestRepair::class, 'building_id');
    }

}
