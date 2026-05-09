export interface Cancha {
	id: number;
	numero: number;
	nombre: string;
	tipo_turno: 'en_punto' | 'y_media';
	tamanio: Tamanio;
	tipo: Tipo;
	turnos: Turno[];
	reservas: Reserva[];
}

export interface Reserva {
	id: number;
	estado_reserva: 'pendiente' | 'confirmada' | 'cancelada';
	fecha_reserva: Date;
	turno: Turno;
	cancha: Cancha;
}

export interface Tamanio {
	id: number;
	capacidad_x_equipo: number;
	ancho: number;
	largo: number;
	canchas: Cancha[];
}

export interface Tipo {
	id: number;
	nombre: string;
	piso: string;
	techo: 'con_techo' | 'sin_techo';
	canchas: Cancha[];
}

export interface Turno {
	id: number;
	hora_ini: string;
	hora_fin: string;
	canchas: Cancha[];
	reservas: Reserva[];
}
