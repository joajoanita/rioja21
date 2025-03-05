<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Voluntariado extends Model
{

    use HasFactory;

    protected $table = 'voluntariados';
    protected $fillable = [
        'city',
        'description',
        'id_empresa',
    ];

    public function empresas(){
       return $this->belongsTo(Empresa::class, 'id_empresa');
    }

    public function usuarios(){
        return $this->belongsToMany(User::class, 'voluntariados_usuarios', 'id_voluntariado', 'id_usuario')
            ->withPivot('fecha')
            ->withTimestamps();
    }

    public static function busquedaPorVoluntariado($query=''){
        if (!$query){
            return self::all();
        }

        return self::where('city', 'like', "%$query%")
            ->orWhere('description', 'like', "%$query%")
            ->get();
    }
}
