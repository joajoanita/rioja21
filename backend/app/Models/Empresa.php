<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;

    protected $table = 'empresas';

    protected $fillable = [
        'name',
        'description'
    ];

   public function voluntariados(){
        return $this->hasMany(Voluntariado::class, 'id_voluntariado');
   }
}
