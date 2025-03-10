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
        'description',
        'id_voluntariado'
    ];

   public function voluntariados(){
        return $this->hasMany(Voluntariado::class, 'id_empresa');
   }

    public static function filtroEmpresa($query= ''){
        if(!$query){
            return self::all();
        }

        return self::where('name', 'like', "%$query%")->get();
    }
}
