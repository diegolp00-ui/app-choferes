/**
 * PORTAL DE CAPACITACIÓN & SOPORTE OPERATIVO PARA CHÓFERES
 * Lógica de Negocio, Simulador Móvil, Evaluaciones y Directorios
 */

// ==========================================
// 1. ESTADO GLOBAL Y PERFILES DE CONDUCTORES
// ==========================================
const AppState = {
  activeDriver: {
    name: "Diego Lizarbe",
    dni: "47891234",
    license: "A-IIIc",
    role: "Conductor Líder / Capacitador",
    plate: "B7A-892"
  },
  driversList: [
    { name: "Diego Lizarbe", dni: "47891234", license: "A-IIIc", status: "Habilitado" },
    { name: "Juan Carlos Quispe", dni: "45123987", license: "A-IIb", status: "Habilitado" },
    { name: "Manuel Rojas Huamán", dni: "42987654", license: "A-IIIa", status: "En Capacitación" },
    { name: "Roberto Gómez Ruiz", dni: "48991203", license: "A-IIIb", status: "Habilitado" }
  ],
  monitors: [
    {
      name: "Juan Carlos Morales",
      role: "Monitor Líder de Ruta",
      zone: "huachipa",
      zoneLabel: "CD Huachipa",
      phone: "987654321",
      schedule: "06:00 - 15:00",
      status: "En Línea",
      statusColor: "emerald"
    },
    {
      name: "Carlos Mendoza",
      role: "Monitor Zonal de Acompañamiento",
      zone: "huachipa",
      zoneLabel: "Ate, Vitarte, Santa Anita, SJL",
      phone: "991234567",
      schedule: "07:00 - 16:00",
      status: "En Ruta",
      statusColor: "blue"
    },
    {
      name: "Miguel Ángel Quispe",
      role: "Supervisor Zonal de Distribución",
      zone: "norte",
      zoneLabel: "Lima Norte (Comas, Olivos, Carabayllo)",
      phone: "984561230",
      schedule: "06:30 - 16:30",
      status: "En Línea",
      statusColor: "emerald"
    },
    {
      name: "Roberto Campos",
      role: "Monitor Zonal de Acompañamiento",
      zone: "sur",
      zoneLabel: "Lima Sur (Lurín, Chorrillos, VES, VMT)",
      phone: "978123456",
      schedule: "07:00 - 16:00",
      status: "En Línea",
      statusColor: "emerald"
    },
    {
      name: "Víctor Fernández",
      role: "Monitor Zonal de Acompañamiento",
      zone: "callao",
      zoneLabel: "Callao, Bellavista, Ventanilla, Faucett",
      phone: "965412890",
      schedule: "06:00 - 15:00",
      status: "En Línea",
      statusColor: "emerald"
    },
    {
      name: "Lic. Diego Lizarbe",
      role: "Jefe de Capacitación & Escuela de Choferes",
      zone: "capacitacion",
      zoneLabel: "Escuela de Conductores Central",
      phone: "994567812",
      schedule: "08:00 - 18:00",
      status: "Disponible",
      statusColor: "emerald"
    }
  ],
  agencies: [{"id":"cd-mosquera","name":"CD Central Mosquera (Taller y Flota)","zone":"Lima Este","district":"Lurigancho","province":"LIMA","category":"Taller y Operaciones Central","address":"Av. Mosquera Mz. C Lote 4, Urb. Huachipa, Lurigancho-Chosica","reference":"A 300 metros de la Carretera Central y Puente Huachipa","gateHours":"Atencion 24/7 (Ingreso camiones por Garita 1)","epp":"Casco, chaleco reflectivo naranja y zapatos con punta de acero obligatorios","phone":"(01) 619-8001 / 987-654-321","lat":"-12.016335","lng":"-76.920152","isHub":true},{"id":"cd-huachipa","name":"CD Huachipa (Hub Principal de DistribuciÃ³n)","zone":"Lima Este","district":"Lurigancho","province":"LIMA","category":"Centro de Distribucion Hub","address":"Av. Las Torres 1450, Huachipa, Lurigancho","reference":"Frente al Complejo Industrial Las Torres","gateHours":"Despacho de 05:00 a 22:00 / Garita 24h","epp":"Chaleco reflectivo, botines de seguridad, fotocheck visible","phone":"(01) 619-8500","lat":"-12.014210","lng":"-76.924850","isHub":true},{"id":"shalom-1","name":"Agencia Shalom CALLAO FAUCETT","zone":"Callao","district":"CALLAO","province":"CALLAO","category":"Agencia Shalom Callao","address":"AV. ELMER FAUCETT N° 492","reference":"Recepcion y despacho de carga en CALLAO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.049958017539","lng":"-77.098095000011","isHub":false},{"id":"shalom-2","name":"Agencia Shalom AV  QUILCA - CALLAO","zone":"Callao","district":"CALLAO","province":"CALLAO","category":"Agencia Shalom Callao","address":"UNIDAD INMOBILIARIA N° 1, AV. QUILCA MZ. G SUB LT. 11C, URB. AEROPUERTO – SEGUNDO SECTOR - CALLAO, REF. CRUCE CON CALLE 1, FRENTE A LA IGLESIA DE TESTIGOS DE JEHOVÁ","reference":". CRUCE CON CALLE 1, FRENTE A LA IGLESIA DE TESTIGOS DE JEHOVÁ","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.033462418573","lng":"-77.096426666561","isHub":false},{"id":"shalom-3","name":"Agencia Shalom AEROPUERTO CALLAO","zone":"Callao","district":"CALLAO","province":"CALLAO","category":"Agencia Shalom Callao","address":"AEROPUERTO INTERNACIONAL JORGE CHAVEZ","reference":"Recepcion y despacho de carga en CALLAO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"0","lng":"0","isHub":false},{"id":"shalom-4","name":"Agencia Shalom OUTLET ARAUCO FAUCETT - CALLAO","zone":"Callao","district":"CALLAO","province":"CALLAO","category":"Agencia Shalom Callao","address":"AV. ELMER FAUCETT 3443 - CALLAO, REF. AL COSTADO DEL AEROPUERTO JORGE CHÁVEZ","reference":". AL COSTADO DEL AEROPUERTO JORGE CHÁVEZ","gateHours":"L-V: 10:00 a 20:00 | Sab: 10:00 a 20:00 | Dom: 10:00 a 19:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.018873043479","lng":"-77.108651230422","isHub":false},{"id":"shalom-5","name":"Agencia Shalom AV BERTELLO CALLAO","zone":"Callao","district":"CALLAO","province":"CALLAO","category":"Agencia Shalom Callao","address":"AV. ALEJANDRO BERTELLO BOLLATI MZ. B LT. 20 Y 21 – URB. PROGRESIVA BAHÍA BLANCA – CALLAO - CALLAO - CALLAO, REF. FRENTE AL MERCADO COSTA AZUL","reference":". FRENTE AL MERCADO COSTA AZUL","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.985684611869","lng":"-77.115837899999","isHub":false},{"id":"shalom-6","name":"Agencia Shalom AV SAENZ PEÑA - CALLAO","zone":"Callao","district":"CALLAO","province":"CALLAO","category":"Agencia Shalom Callao","address":"AV. SAENZ PEÑA N° 414 - 416 - CALLAO - CALLAO, REF. CRUCE CON AV. MARCO POLO","reference":". CRUCE CON AV. MARCO POLO","gateHours":"L-V: 08:00 a 19:00 | Sab: 08:00 a 19:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.061012700004","lng":"-77.142579099985","isHub":false},{"id":"shalom-7","name":"Agencia Shalom BELLAVISTA CALLAO","zone":"Callao","district":"BELLAVISTA","province":"CALLAO","category":"Agencia Shalom Callao","address":"AV. ELMER FAUCETT 1641 - URB. JARDINES VIRÚ MZ. B LT 46, BELLAVISTA - CALLAO, REF. A 2 CUADRAS DEL CRUCE DE AV. FAUCETT CON AV. VENEZUELA","reference":". A 2 CUADRAS DEL CRUCE DE AV. FAUCETT CON AV. VENEZUELA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.060813729761","lng":"-77.097564493089","isHub":false},{"id":"shalom-8","name":"Agencia Shalom OVALO LA PERLA","zone":"Callao","district":"LA PERLA","province":"CALLAO","category":"Agencia Shalom Callao","address":"AV. LA MARINA 530, URB. BENJAMIN DOIGG LOSSIO, LA PERLA, CALLAO, REF. A 3 CUADRAS DEL ÓVALO DE LA PERLA","reference":". A 3 CUADRAS DEL ÓVALO DE LA PERLA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.068000755733","lng":"-77.115764452752","isHub":false},{"id":"shalom-9","name":"Agencia Shalom PARAD.  LOS LICENCIADOS - VENTANILLA","zone":"Callao","district":"VENTANILLA","province":"CALLAO","category":"Agencia Shalom Callao","address":"CALLE 19, Mz. J Lt. 26 ZN - URB. Coop. De La Marina, REFERENCIA: AL COSTADO DE LUBRICENTRO PABLITO ROMERO","reference":"AL COSTADO DE LUBRICENTRO PABLITO ROMERO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.879870488107","lng":"-77.126912984603","isHub":false},{"id":"shalom-10","name":"Agencia Shalom PACHACUTEC PDRO CHINITAS - VENTANILLA","zone":"Callao","district":"VENTANILLA","province":"CALLAO","category":"Agencia Shalom Callao","address":"AV. 225 MZ. H SUB LT. T. 11 - ASOC  PROY. ESP. CIUDAD PACHACUTEC, REF. A 1 CDRA. DEL CRUCE CON AV. LOS PROYECTISTAS, VENTANILLA - LIMA - LIMA","reference":". A 1 CDRA. DEL CRUCE CON AV. LOS PROYECTISTAS, VENTANILLA - LIMA - LIMA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.841691881151","lng":"-77.137115856604","isHub":false},{"id":"shalom-11","name":"Agencia Shalom PACHACUTEC PDRO VC - VENTANILLA","zone":"Callao","district":"VENTANILLA","province":"CALLAO","category":"Agencia Shalom Callao","address":"AV. 225 MZ F LOTE 2 SECTOR A GRUPO RESIDENCIAL A2 - PROYECTO PILOTO NUEVO PACHACUTEC, VENTANILLA - CALLAO - CALLAO, REF. FRENTE AL CENTRO DE SALUD 3 DE FEBRERO","reference":". FRENTE AL CENTRO DE SALUD 3 DE FEBRERO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.829064116198","lng":"-77.158289677599","isHub":false},{"id":"shalom-12","name":"Agencia Shalom PACHACUTEC  AV 150 - VENTANILLA","zone":"Callao","district":"VENTANILLA","province":"CALLAO","category":"Agencia Shalom Callao","address":"AV. 150 IZQUIERDA MZ. W2 LT. 01 PROYECTO PILOTO NUEVO PACHACUTEC, VENTANILLA - CALLAO - CALLAO, REF. A 1 CDRA. DEL CRUCE AV. CAMINO DEL INCA","reference":". A 1 CDRA. DEL CRUCE AV. CAMINO DEL INCA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.838273352412","lng":"-77.156421448409","isHub":false},{"id":"shalom-13","name":"Agencia Shalom MI PERU","zone":"Callao","district":"MI PERU","province":"CALLAO","category":"Agencia Shalom Callao","address":"V. VICTOR RAUL HAYA DE LA TORRE MZ. A LT. 02 ASENTAMIENTO HUMANO CONFRATERNIDAD - III SECTOR - MI PERU – CALLAO - CALLAO, REF. CRUCE CON AV. AREQUIPA","reference":". CRUCE CON AV. AREQUIPA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.857445566174","lng":"-77.128500287367","isHub":false},{"id":"shalom-14","name":"Agencia Shalom CAJA DISTRIBUCION LIMA - CERCADO LIMA","zone":"Lima Centro","district":"CERCADO LIMA","province":"LIMA","category":"Agencia Shalom Lima","address":"Direccion en registro operativo Shalom","reference":"Recepcion y despacho de carga en CERCADO LIMA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"","lng":"","isHub":false},{"id":"shalom-15","name":"Agencia Shalom MALVINAS - JR. RICARDO TRENEMAN - CERCADO LIMA","zone":"Lima Centro","district":"CERCADO LIMA","province":"LIMA","category":"Agencia Shalom Lima","address":"JR. RICARDO TRENEMAN N° 920, REFERENCIA: DENTRO DEL LOCAL FARENET","reference":"DENTRO DEL LOCAL FARENET","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.046751","lng":"-77.054634","isHub":false},{"id":"shalom-16","name":"Agencia Shalom MALVINAS - JR. GARCIA VILLóN - CERCADO LIMA","zone":"Lima Centro","district":"CERCADO LIMA","province":"LIMA","category":"Agencia Shalom Lima","address":"JR. PRESBÍTERO GARCÍA VILLON NRO. 560 CERCADO LIMA - LIMA, REF. A LA ALTURA DE LA CDRA. 5 DE AV. OSCAR R. BENAVIDES (EX AV. COLONIAL), EN MEDIO DE LAS AV. GUILLERMO DANSEY Y AV. OSCAR R. BENAVIDES","reference":". A LA ALTURA DE LA CDRA. 5 DE AV. OSCAR R. BENAVIDES (EX AV. COLONIAL), EN MEDIO DE LAS AV. GUILLERMO DANSEY Y AV. OSCAR R. BENAVIDES","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.04638719585","lng":"-77.049473000003","isHub":false},{"id":"shalom-17","name":"Agencia Shalom LIMA AV TINGO MARÍA - CERCADO LIMA","zone":"Lima Centro","district":"CERCADO LIMA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. TINGO MARÍA N°1252-A - CERCADO DE LIMA - LIMA, REF. A MEDIA CDRA. DEL CRUCE CON JR. GRAL. ORBEGOSO","reference":". A MEDIA CDRA. DEL CRUCE CON JR. GRAL. ORBEGOSO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.0606406907256","lng":"-77.0589838666984","isHub":false},{"id":"shalom-18","name":"Agencia Shalom AV  NICOLAS DUEÑAS CDRA. 5 - CERCADO LIMA","zone":"Lima Centro","district":"CERCADO LIMA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. NICOLAS DUEÑAS 584 MZ. C LT. 4 – AAHH PRIMERO DE SETIEMBRE, CERCADO DE LIMA – LIMA - LIMA, REF. A MEDIA CDRA. DEL CRUCE CON JR. PEDRO GAREZON","reference":". A MEDIA CDRA. DEL CRUCE CON JR. PEDRO GAREZON","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.041685469771842","lng":"-77.06569704398638","isHub":false},{"id":"shalom-19","name":"Agencia Shalom ANCON","zone":"Lima Norte","district":"ANCON","province":"LIMA","category":"Agencia Shalom Lima","address":"CARRETERA SERPENTÍN DE PASAMAYO MZ. G LT. 3 SUBLT. B - ASOC. DE PROP. CASA HUERTA IND. PECUARIAS SAN PEDRO ZONA 4, ANCÓN - LIMA-LIMA, REF. A 1 CDRA. DEL OVALO DE ANCÓN","reference":". A 1 CDRA. DEL OVALO DE ANCÓN","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.774039837812818","lng":"-77.16181025497632","isHub":false},{"id":"shalom-20","name":"Agencia Shalom HUAYCAN ENTRADA - ATE-VITARTE","zone":"Lima Este","district":"ATE-VITARTE","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. ANDRÉS AVELINO CÁCERES MZ G LT. 14, 1ER PISO PROG DE VIV. PHILADELFIA DE ATE IV ETAPA, ATE VITARTE - LIMA - LIMA, REF. A UNA CDRA. DE LA CTRA. CENTRAL, PARADERO EL LAVADERO","reference":". A UNA CDRA. DE LA CTRA. CENTRAL, PARADERO EL LAVADERO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.998277984658","lng":"-76.834139993339","isHub":false},{"id":"shalom-21","name":"Agencia Shalom AV  MARCO PUENTE - ATE-VITARTE","zone":"Lima Este","district":"ATE-VITARTE","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. MARCO PUENTE LLANOS 309, MZ. A, LT. 03","reference":"Recepcion y despacho de carga en ATE-VITARTE","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.032176320939","lng":"-76.921789902195","isHub":false},{"id":"shalom-22","name":"Agencia Shalom PUENTE SANTA ANITA - ATE-VITARTE","zone":"Lima Este","district":"ATE-VITARTE","province":"LIMA","category":"Agencia Shalom Lima","address":"Av. Nicolás Ayllón N° 3080  - Ate vitarte","reference":"Recepcion y despacho de carga en ATE-VITARTE","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.057126998901367","lng":"-76.96934509277344","isHub":false},{"id":"shalom-23","name":"Agencia Shalom HUAYCAN AV JOSE C MARIATEGUI - ATE-VITARTE","zone":"Lima Este","district":"ATE-VITARTE","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. JOSÉ CARLOS MARIÁTEGUI Z. E LT. 23 UCV 5 (ZONA COMERCIO) - PUEBLO JOVEN \"PROYECTO ESPECIAL HUAYCÁN\" ATE VITARTE - LIMA, REF. A DOS CDRAS. DEL CRUCE CON AV. 15 DE JULIO","reference":". A DOS CDRAS. DEL CRUCE CON AV. 15 DE JULIO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.014821320970137","lng":"-76.82313108705995","isHub":false},{"id":"shalom-24","name":"Agencia Shalom LOS SAUCES - ATE-VITARTE","zone":"Lima Este","district":"ATE-VITARTE","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. SANTA ROSA N°773 MANZANA “A” LOTE 6 URB LOS SAUCES - ATE - REFERENCIA: CRUCE CON LA AV SEPARADORA INDUSTRIAL","reference":"CRUCE CON LA AV SEPARADORA INDUSTRIAL","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.0709298","lng":"-76.9809503","isHub":false},{"id":"shalom-25","name":"Agencia Shalom SANTA CLARA - ATE-VITARTE","zone":"Lima Este","district":"ATE-VITARTE","province":"LIMA","category":"Agencia Shalom Lima","address":"Av. Pedro Ruíz Gallo Mz. H Lt. 3. Asoc. Viv. Villa San Luis, Santa Clara - Ate Vitarte - LimaRef: Entre el Real Plaza y la UTP Santa Clara","reference":"Entre el Real Plaza y la UTP Santa Clara","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.013911972067","lng":"-76.884198929523","isHub":false},{"id":"shalom-26","name":"Agencia Shalom AV  ESPERANZA - ATE-VITARTE","zone":"Lima Este","district":"ATE-VITARTE","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. ESPERANZA MZ. K LT. 06 LAS AMERICAS - ATE VITARTE - LIMA, REF. PASANDO MERCADO RAUCANA","reference":". PASANDO MERCADO RAUCANA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.031974898143","lng":"-76.904894767678","isHub":false},{"id":"shalom-27","name":"Agencia Shalom AV EL SOL - ATE-VITARTE","zone":"Lima Este","district":"ATE-VITARTE","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. EL SOL MZ. S LT. 2 ZONA 03 - ASOC. PARQUE INDUSTRIAL EL ASESOR, SECTOR 010 ZONA 03 - ATE, REF. A UNA CUADRA Y MEDIA DE LA CARRETERA CENTRAL","reference":". A UNA CUADRA Y MEDIA DE LA CARRETERA CENTRAL","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.038365169091593","lng":"-76.93396781379997","isHub":false},{"id":"shalom-28","name":"Agencia Shalom HUAYCAN  EL DESCANSO - ATE-VITARTE","zone":"Lima Este","district":"ATE-VITARTE","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. JOSE CARLOS MARIATEGUI MZA. B LTE 06, RESIDENCIAL PARIACHI SEC. 031 ZON. 05, ATE - LIMA - LIMA, REF. CRUCE CON LA AV. LOS INCAS","reference":". CRUCE CON LA AV. LOS INCAS","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.004388120507466","lng":"-76.83611140249312","isHub":false},{"id":"shalom-29","name":"Agencia Shalom URB SANTA ELVIRA - ATE-VITARTE","zone":"Lima Este","district":"ATE-VITARTE","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. FERROCARRIL MZ. C LT. 19 PARCELA 3, URB. SANTA ELVIRA SEC. 018 ZONA 3, REF. A MEDIA CDRA. DEL CRUCE CON AV. DE LA CULTURA","reference":". A MEDIA CDRA. DEL CRUCE CON AV. DE LA CULTURA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.028531299993436","lng":"-76.950749770605","isHub":false},{"id":"shalom-30","name":"Agencia Shalom HUAYCAN AV HORACIO ZEVALLOS - ATE-VITARTE","zone":"Lima Este","district":"ATE-VITARTE","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. HORACIO ZEBALLOS MZ. V LT. 12 PROG. VIV. RESIDENCIAL PARIACHI (SEC. 031) ZONA 5, ATE - LIMA - LIMA, REF. FRENTE AL CIRCUITO DE MANEJO GARCILASO DE LA VEGA","reference":". FRENTE AL CIRCUITO DE MANEJO GARCILASO DE LA VEGA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.007693484031522","lng":"-76.8424867018833","isHub":false},{"id":"shalom-31","name":"Agencia Shalom LOS VIRREYES - ATE (POR DEFINIR) - ATE-VITARTE","zone":"Lima Este","district":"ATE-VITARTE","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. LOS VIRREYES MZ. A LT. 21 URB. TILDA SEC. 010 ZN. 03, REF. A 2 CDRAS. DEL INNOVA SCHOOLS DE ATE VITARTE","reference":". A 2 CDRAS. DEL INNOVA SCHOOLS DE ATE VITARTE","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.029586241176","lng":"-76.937886190247","isHub":false},{"id":"shalom-32","name":"Agencia Shalom AV VENEZUELA - BRENA","zone":"Lima Centro","district":"BRENA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. VENEZUELA 1670 - BREÑA, REFERENCIA: AL COSTADO DEL POLICLÍNICO DE BREÑA","reference":"AL COSTADO DEL POLICLÍNICO DE BREÑA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.055384807466","lng":"-77.055713323752","isHub":false},{"id":"shalom-33","name":"Agencia Shalom JR. HUARAZ -  BREÑA - BRENA","zone":"Lima Centro","district":"BRENA","province":"LIMA","category":"Agencia Shalom Lima","address":"JR. HUARAZ 1633, BREÑA -LIMA, REF. EN MEDIO DEL CRUCE DE JR. GRAL ORBEGOSO Y JR. CENTENARIO CON JR. HUARAZ","reference":". EN MEDIO DEL CRUCE DE JR. GRAL ORBEGOSO Y JR. CENTENARIO CON JR. HUARAZ","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.065815746489534","lng":"-77.04986305455087","isHub":false},{"id":"shalom-34","name":"Agencia Shalom CARABAYLLO ESTABLO","zone":"Lima Norte","district":"CARABAYLLO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. TUPAC AMARU N? 441 - 443, MZ. O2 LT. 35, REFERENCIA: PARADERO ESTABLO, A UNA CUADRA DE LA URB. SANTA ISABEL","reference":"PARADERO ESTABLO, A UNA CUADRA DE LA URB. SANTA ISABEL","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.9035821","lng":"-77.0309854","isHub":false},{"id":"shalom-35","name":"Agencia Shalom TUNGASUCA - CARABAYLLO","zone":"Lima Norte","district":"CARABAYLLO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. TRAPICHE MZ. P LT. 48, URB. TUNGASUCA REFERENCIA: AUX. AV. CHIMPU OCLLO CON AUX. CHILLÓN TRAPICHE, A 1 CUADRA DEL MERCADO QATUNA","reference":"AUX. AV. CHIMPU OCLLO CON AUX. CHILLÓN TRAPICHE, A 1 CUADRA DEL MERCADO QATUNA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.891425542922","lng":"-77.044425516811","isHub":false},{"id":"shalom-36","name":"Agencia Shalom AV  TUPAC AMARU KM. 19 - CARABAYLLO","zone":"Lima Norte","district":"CARABAYLLO","province":"LIMA","category":"Agencia Shalom Lima","address":"JR. LOS SAUCES MZ. E LOTE 9 DEL AA. HH. VILLA MANUEL ESCORZA, REF. ENTRE PROLONGACION AV. PRIMAVERA Y JR. LOS SAUCES ALTURA DE AV. TUPAC AMARU KM. 19","reference":". ENTRE PROLONGACION AV. PRIMAVERA Y JR. LOS SAUCES ALTURA DE AV. TUPAC AMARU KM. 19","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.880455724702","lng":"-77.021657153123","isHub":false},{"id":"shalom-37","name":"Agencia Shalom AV. TUPAC AMARU KM. 23.5 - CARABAYLLO","zone":"Lima Norte","district":"CARABAYLLO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. TÚPAC AMARU KM. 23.5 - CARABAYLLO, REF. FRENTE A LA IGLESIA DE MORMONES - A UNA CDRA. DEL ÚLTIMO PARADERO DEL RÁPIDO","reference":". FRENTE A LA IGLESIA DE MORMONES - A UNA CDRA. DEL ÚLTIMO PARADERO DEL RÁPIDO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.844310757655741","lng":"-77.00039932685678","isHub":false},{"id":"shalom-38","name":"Agencia Shalom AV JOSE SACO ROJAS - CARABAYLLO","zone":"Lima Norte","district":"CARABAYLLO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. JOSÉ SACO ROJAS MZ. A LT. 15 PROGRAMA DE VIVIENDA EL PINO, SAN ANTONIO - CARABAYLLO, REF. FRENTE AL CHIFA HONG FU Y A 3 CUADRAS DEL GRAN MERCADO EL PINO","reference":". FRENTE AL CHIFA HONG FU Y A 3 CUADRAS DEL GRAN MERCADO EL PINO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.858131810981817","lng":"-77.04414250346564","isHub":false},{"id":"shalom-39","name":"Agencia Shalom SANTO DOMINGO - CARABAYLLO","zone":"Lima Norte","district":"CARABAYLLO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. A MZ. L2 LT. 20 URB. SANTO DOMINGO – VI ETAPA CARABAYLLO - LIMA, REF. EN EL CRUCE DE LAS AV. CHILLON TRAPICHE Y AV. CAMINO REAL","reference":". EN EL CRUCE DE LAS AV. CHILLON TRAPICHE Y AV. CAMINO REAL","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.873004724827046","lng":"-77.0290837822141","isHub":false},{"id":"shalom-40","name":"Agencia Shalom EL PROGRESO KM 22 - CARABAYLLO","zone":"Lima Norte","district":"CARABAYLLO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. TUPAC AMARU 3493 – P.J. EL PROGRESO (PARTE BAJA) MZ. K LT. 11B ZONA II, CARABAYLLO - LIMA, REF. A UNA CDRA. DEL CRUCE CON LA AV. MANUEL PRADO","reference":". A UNA CDRA. DEL CRUCE CON LA AV. MANUEL PRADO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.872316361141715","lng":"-77.01521214760115","isHub":false},{"id":"shalom-41","name":"Agencia Shalom CHORRILLOS CO","zone":"Lima Sur","district":"CHORRILLOS","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. SANTA ANITA N.° 580, CHORRILLOS - LIMA, REF. AL COSTADO DEL MERCADO SANTA ANITA, CRUCE CON SAN GENARO","reference":". AL COSTADO DEL MERCADO SANTA ANITA, CRUCE CON SAN GENARO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.19049228146922","lng":"-77.01532743242808","isHub":false},{"id":"shalom-42","name":"Agencia Shalom CHORRILLOS LOS FAISANES","zone":"Lima Sur","district":"CHORRILLOS","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. LOS FAISANES 420, REFERENCIA: AL COSTADO DE LA TIENDA JOHN HOLDEN","reference":"AL COSTADO DE LA TIENDA JOHN HOLDEN","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.176072","lng":"-76.998107","isHub":false},{"id":"shalom-43","name":"Agencia Shalom LAS DELICIAS DE VILLA - CHORRILLOS","zone":"Lima Sur","district":"CHORRILLOS","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. 12 DE OCTUBRE MZ. A - 03, LT. 02, URB. ARIA - LAS DELICIAS DE VILLA, REF. A DOS CUADRAS DE LA AV. DEFENSORES DEL MORRO (EX AV. HUAYLAS)","reference":". A DOS CUADRAS DE LA AV. DEFENSORES DEL MORRO (EX AV. HUAYLAS)","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.195888810911","lng":"-76.998027663434","isHub":false},{"id":"shalom-44","name":"Agencia Shalom MEGAPLAZA CHORRILLOS","zone":"Lima Sur","district":"CHORRILLOS","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. ALAMEDA SUR 5, CHORRILLOS 15067, REF. CRUCE DE AV. ALAMEDA SUR CONAV. ALAMEDA SAN MARCOS","reference":". CRUCE DE AV. ALAMEDA SUR CONAV. ALAMEDA SAN MARCOS","gateHours":"L-V: 10:00 a 19:00 | Sab: 10:00 a 19:00 | Dom: 10:00 a 19:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.19672190971743","lng":"-77.01160198642162","isHub":false},{"id":"shalom-45","name":"Agencia Shalom CIENEGUILLA KM. 14.5","zone":"Lima Este","district":"CIENEGUILLA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. ARTERIAL HUAROCHIRI D MZ. B LT. 19, ASOC. DE VIVIENDAS LAS CUMBRES DE CIENEGUILLA, LIMA, REF. AL COSTADO DE LA TIENDA MASS","reference":". AL COSTADO DE LA TIENDA MASS","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.089303982280754","lng":"-76.85365371221069","isHub":false},{"id":"shalom-46","name":"Agencia Shalom REPARTO SAN LUIS - CIENEGUILLA","zone":"Lima Este","district":"CIENEGUILLA","province":"LIMA","category":"Agencia Shalom Lima","address":"SAN LUIS","reference":"Recepcion y despacho de carga en CIENEGUILLA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.089303982280754","lng":"-76.85365371221069","isHub":false},{"id":"shalom-47","name":"Agencia Shalom AV UNIV.  RETABLO - COMAS","zone":"Lima Norte","district":"COMAS","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. UNIVERSITARIA N° 7241, REFERENCIA: EX BOULEVARD DE RETABLO / A 2 CDRAS DEL METRO DE BELAUNDE","reference":"EX BOULEVARD DE RETABLO / A 2 CDRAS DEL METRO DE BELAUNDE","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.937314524134514","lng":"-77.05809407916101","isHub":false},{"id":"shalom-48","name":"Agencia Shalom AV. TRAPICHE - COMAS","zone":"Lima Norte","district":"COMAS","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. TRAPICHE 886 A 16 2P 2 - URB. PINAR, REFERENCIA: FRENTE AL COMPLEJO DEPORTIVO WALON","reference":"FRENTE AL COMPLEJO DEPORTIVO WALON","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.91918929266535","lng":"-77.06050258466907","isHub":false},{"id":"shalom-49","name":"Agencia Shalom AÑO NUEVO - COMAS","zone":"Lima Norte","district":"COMAS","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. TUPAC AMARU N° 7837- 7839 MZ. C LT. 010 URB. POPULAR SAN JUAN BAUTISTA I ETAPA, COMAS - LIMA, REF. A UNA CDRA. DE LA ENTRADA DE COLLIQUE","reference":". A UNA CDRA. DE LA ENTRADA DE COLLIQUE","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.915107566733","lng":"-77.040662268934","isHub":false},{"id":"shalom-50","name":"Agencia Shalom AV TUPAC AMARU CDRA. 57 - COMAS","zone":"Lima Norte","district":"COMAS","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. TUPAC AMARU 5725-5727 - URB. HUAQUILLAY I ETAPA, COMAS - LIMA - LIMA, REF. A MEDIA CDRA. DEL BANCO DE LA NACIÓN","reference":". A MEDIA CDRA. DEL BANCO DE LA NACIÓN","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.945312645665","lng":"-77.050549078246","isHub":false},{"id":"shalom-51","name":"Agencia Shalom AV. UNIV. PARQUE SINCHI ROCA - COMAS","zone":"Lima Norte","district":"COMAS","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. UNIVERSITARIA NORTE MZN. Q1 LTE. 030 URB. PRIMAVERA,COMAS-LIMA - LIMA, REF. A MEDIA CDRA. DEL INGRESO AL PARQUE ZONA SINCHI ROCA","reference":". A MEDIA CDRA. DEL INGRESO AL PARQUE ZONA SINCHI ROCA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.919995063846647","lng":"-77.05093521974257","isHub":false},{"id":"shalom-52","name":"Agencia Shalom URB. REPARTICIÓN - COMAS","zone":"Lima Norte","district":"COMAS","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. TUPAC AMARU 3184 URB. REPARTICION, COMAS - LIMA - LIMA, REF. A MEDIA CDRA. DE AV. VICTOR ANDRES BELAUNDE Y/O FRENTE A DOLLARCITY","reference":". A MEDIA CDRA. DE AV. VICTOR ANDRES BELAUNDE Y/O FRENTE A DOLLARCITY","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.939410443955","lng":"-77.0500541","isHub":false},{"id":"shalom-53","name":"Agencia Shalom PUENTE NUEVO - EL AGUSTINO","zone":"Lima Este","district":"EL AGUSTINO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV 1° DE MAYO 3071 - URB HUANCAYO  referencia : FRENTE AL GRIFO REPSOL","reference":": FRENTE AL GRIFO REPSOL","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.0300919","lng":"-76.9991156","isHub":false},{"id":"shalom-54","name":"Agencia Shalom JIRON ANCASH - EL AGUSTINO","zone":"Lima Este","district":"EL AGUSTINO","province":"LIMA","category":"Agencia Shalom Lima","address":"JR. ANCASH MZ. B LT. 11 AAHH ANCIETA ALTA, EL AGUSTINO - LIMA - LIMA, REF. FRENTE AL INGRESO DE AGUSTINO PLAZA","reference":". FRENTE AL INGRESO DE AGUSTINO PLAZA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.041365477648608","lng":"-77.00264283281007","isHub":false},{"id":"shalom-55","name":"Agencia Shalom LA CINCUENTA - INDEPENDENCIA","zone":"Lima Norte","district":"INDEPENDENCIA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. TUPAC AMARU N° 4708 - 4710, REF. A UNA CDRA. DEL PARADERO ESTACIÓN NARANJAL","reference":". A UNA CDRA. DEL PARADERO ESTACIÓN NARANJAL","gateHours":"L-V: 08:00 a 19:00 | Sab: 08:00 a 19:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.978882502306485","lng":"-77.0591044310316","isHub":false},{"id":"shalom-56","name":"Agencia Shalom PLAZA NORTE S. EXPRESS - INDEPENDENCIA","zone":"Lima Norte","district":"INDEPENDENCIA","province":"LIMA","category":"Agencia Shalom Lima","address":"Av. GERARDO UNGER NRO. 6917 INT. LB 19","reference":"Recepcion y despacho de carga en INDEPENDENCIA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.004946","lng":"-77.055867","isHub":false},{"id":"shalom-57","name":"Agencia Shalom PLAZA NORTE ENTREGAS - INDEPENDENCIA","zone":"Lima Norte","district":"INDEPENDENCIA","province":"LIMA","category":"Agencia Shalom Lima","address":"Av. GERARDO UNGER NRO. 6917 INT. LB 19","reference":"Recepcion y despacho de carga en INDEPENDENCIA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.004946","lng":" -77.055867","isHub":false},{"id":"shalom-58","name":"Agencia Shalom MEGAPLAZA INDEPENDENCIA","zone":"Lima Norte","district":"INDEPENDENCIA","province":"LIMA","category":"Agencia Shalom Lima","address":"CENTRO COMERCIAL MEGA PLAZA AV. ALFREDO MENDIOLA 3698 LIMA - INDEPENDENCIA. REF. PRIMER PISO DE MEGA PLAZA / AL COSTADO DEL ESTACIONAMIENTO DE BICICLETA","reference":". PRIMER PISO DE MEGA PLAZA / AL COSTADO DEL ESTACIONAMIENTO DE BICICLETA","gateHours":"L-V: 10:00 a 20:00 | Sab: 10:00 a 20:00 | Dom: 10:00 a 20:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.993286670554024","lng":"-77.06326926907906","isHub":false},{"id":"shalom-59","name":"Agencia Shalom CALLE A  CON AV INDUSTRIAL - INDEPENDENCIA","zone":"Lima Norte","district":"INDEPENDENCIA","province":"LIMA","category":"Agencia Shalom Lima","address":"CALLE A, MZ. D LT. 26 URBANIZACIÓN PANAMERICANA (PRIMER PISO) INDEPENDENCIA - LIMA - LIMA, REF. A 1 CDRA. DEL CRUCE CON AV. INDUSTRIAL (LATERAL DE MEGAPLAZA)","reference":". A 1 CDRA. DEL CRUCE CON AV. INDUSTRIAL (LATERAL DE MEGAPLAZA)","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.992650999981887","lng":"-77.06030747047947","isHub":false},{"id":"shalom-60","name":"Agencia Shalom AV. SAN FELIPE - JESUS MARIA","zone":"Lima Centro","district":"JESUS MARIA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. SAN FELIPE 1195 - JESÚS MARÍA","reference":"Recepcion y despacho de carga en JESUS MARIA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 14:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.0822274","lng":"-77.0459498","isHub":false},{"id":"shalom-61","name":"Agencia Shalom AV. ARENALES - JESUS MARIA","zone":"Lima Centro","district":"JESUS MARIA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. ARENALES 391, REFERENCIA: A 2 CDRAS. DE AV. 28 DE JULIO A LA ESPALDA DE LA UTP","reference":"A 2 CDRAS. DE AV. 28 DE JULIO A LA ESPALDA DE LA UTP","gateHours":"L-V: 08:00 a 19:00 | Sab: 09:00 a 14:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.068228","lng":"-77.037967","isHub":false},{"id":"shalom-62","name":"Agencia Shalom JESUS MARIA","zone":"Lima Centro","district":"JESUS MARIA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. MARISCAL LUZURIAGA 584-586 JESÚS MARÍA - LIMA, REF. A CUADRA Y MEDIA DEL PARQUE SAN JOSÉ, PARALELO A LA AV. MELLO FRANCO","reference":". A CUADRA Y MEDIA DEL PARQUE SAN JOSÉ, PARALELO A LA AV. MELLO FRANCO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.076277049292106","lng":"-77.0481659884218","isHub":false},{"id":"shalom-63","name":"Agencia Shalom REAL PLAZA SALAVERRY - JESUS MARIA","zone":"Lima Centro","district":"JESUS MARIA","province":"LIMA","category":"Agencia Shalom Lima","address":"CENTRO COMERCIAL REAL PLAZA SALAVERRY, AV. GRAL. SALAVERRY 2370, JESÚS MARÍA 15076, REF. FRENTE A LA ESCUELA DE POSTGRADO UTP","reference":". FRENTE A LA ESCUELA DE POSTGRADO UTP","gateHours":"L-V: 11:00 a 19:30 | Sab: 11:00 a 19:30 | Dom: 11:00 a 19:30","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.089813084346","lng":"-77.052643198724","isHub":false},{"id":"shalom-64","name":"Agencia Shalom AV  LA FONTANA - LA MOLINA","zone":"Lima Centro","district":"LA MOLINA","province":"LIMA","category":"Agencia Shalom Lima","address":"Av la fontana 440 - La Molina (CC La Rotonda II local 1018)","reference":"Recepcion y despacho de carga en LA MOLINA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.072691","lng":"-76.9548488","isHub":false},{"id":"shalom-65","name":"Agencia Shalom LOS FRESNOS - LA MOLINA","zone":"Lima Centro","district":"LA MOLINA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. LOS FRESNOS 1305 TIENDA 2 - URB. PORTADA DEL SOL I ETAPA - LA MOLINA - LIMA, REF. A 3 CDRAS. DEL ÓVALO DE LOS CÓNDORES","reference":". A 3 CDRAS. DEL ÓVALO DE LOS CÓNDORES","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.104084611289","lng":"-76.9414167","isHub":false},{"id":"shalom-66","name":"Agencia Shalom AV. LA MOLINA CDRA. 35","zone":"Lima Centro","district":"LA MOLINA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. LA MOLINA (EXAV. LA UNIVERSIDAD) #3551 TDA -7 MZ. H SUBLOTE 1C, URB. EL SOL DE LA MOLINA I ETAPA LA MOLINA - LIMA, REF. A MEDIA CDRA. DEL CRUCE CON AV. EL SOL","reference":". A MEDIA CDRA. DEL CRUCE CON AV. EL SOL","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 10:00 a 14:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.085763100386","lng":"-76.913409441937","isHub":false},{"id":"shalom-67","name":"Agencia Shalom AV  FLORA TRISTAN - LA MOLINA","zone":"Lima Centro","district":"LA MOLINA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. FLORA TRISTÁN N° 885, URB. SANTA PATRICIA III ETAPA, LA MOLINA - LIMA, REF.  A MEDIA CDRA. DE MOLISALUD","reference":".  A MEDIA CDRA. DE MOLISALUD","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.064156609712583","lng":"-76.9455208508212","isHub":false},{"id":"shalom-68","name":"Agencia Shalom PARQUE LA MOLINA","zone":"Lima Centro","district":"LA MOLINA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. LA MOLINA 2448, LA MOLINA 15026, LA MOLINA - LIMA - LIMA, REF. ESTACIONAMIENTO NIVEL -3","reference":". ESTACIONAMIENTO NIVEL -3","gateHours":"L-V: 10:00 a 20:00 | Sab: 10:00 a 20:00 | Dom: 10:00 a 19:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.07532253461305","lng":"-76.93612151388963","isHub":false},{"id":"shalom-69","name":"Agencia Shalom AV ALAMEDA DEL CORREGIDOR - LA MOLINA","zone":"Lima Centro","district":"LA MOLINA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. ALAMEDA DEL CORREGIDOR MZ. U LT. 19 UI 1 - URB LA CAPILLA, LA MOLINA - LIMA - LIMA, REF. A 2 CDRAS. DEL CRUCE CON ALAMEDA DE LOS CÓNDORES","reference":". A 2 CDRAS. DEL CRUCE CON ALAMEDA DE LOS CÓNDORES","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.105549936759","lng":"-76.946964207289","isHub":false},{"id":"shalom-70","name":"Agencia Shalom AV MEXICO CO - LA VICTORIA","zone":"Lima Centro","district":"LA VICTORIA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. MEXICO 1125, LA VICTORIA - LIMA","reference":"Recepcion y despacho de carga en LA VICTORIA","gateHours":"L-V: 08:00 a 21:00 | Sab: 08:00 a 21:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.073430785867","lng":"-77.01758370586","isHub":false},{"id":"shalom-71","name":"Agencia Shalom JR. LUNA PIZARRO - LA VICTORIA","zone":"Lima Centro","district":"LA VICTORIA","province":"LIMA","category":"Agencia Shalom Lima","address":"JR. LUNA PIZARRO N° 701 - LA VICTORIA,  REFERENCIA: ESQUINA HIPÓLITO UNANUE","reference":"ESQUINA HIPÓLITO UNANUE","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.0670586","lng":"-77.0273264","isHub":false},{"id":"shalom-72","name":"Agencia Shalom JR. RAYMONDI - LA VICTORIA","zone":"Lima Centro","district":"LA VICTORIA","province":"LIMA","category":"Agencia Shalom Lima","address":"JR. ANTONIO RAYMONDI NRO. 113","reference":"Recepcion y despacho de carga en LA VICTORIA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.061097830007334","lng":"-77.0344310742025","isHub":false},{"id":"shalom-73","name":"Agencia Shalom AV. CANADA - LA VICTORIA","zone":"Lima Centro","district":"LA VICTORIA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. CANADÁ 1603, REFERENCIA: ENTRE AV. CANADÁ CON AV. AVIACIÓN","reference":"ENTRE AV. CANADÁ CON AV. AVIACIÓN","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.0840074","lng":"-77.0058111","isHub":false},{"id":"shalom-74","name":"Agencia Shalom AREA SHALOM EMPRESAS - LA VICTORIA","zone":"Lima Centro","district":"LA VICTORIA","province":"LIMA","category":"Agencia Shalom Lima","address":"direccion","reference":"Recepcion y despacho de carga en LA VICTORIA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"0","lng":"0","isHub":false},{"id":"shalom-75","name":"Agencia Shalom CAJA TRANSPORTE MEXICO - LA VICTORIA","zone":"Lima Centro","district":"LA VICTORIA","province":"LIMA","category":"Agencia Shalom Lima","address":"cargando","reference":"Recepcion y despacho de carga en LA VICTORIA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"","lng":"","isHub":false},{"id":"shalom-76","name":"Agencia Shalom JR CASANOVA CON PETIT THOUARS - LINCE","zone":"Lima Centro","district":"LINCE","province":"LIMA","category":"Agencia Shalom Lima","address":"JR. DOMINGO CASANOVA N°318 LINCE - LIMA, REF. CRUCE CON PETIT THOUARS","reference":". CRUCE CON PETIT THOUARS","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.089639700017","lng":"-77.032406270598","isHub":false},{"id":"shalom-77","name":"Agencia Shalom AV JOSE LEAL CDRA 6 - LINCE","zone":"Lima Centro","district":"LINCE","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. CORONEL JOSÉ LEAL 648, URB. FUNDO LOBATÓN, LINCE - LINCE, REF. PARALELA A LA CDRA. 6 DE LA AV. CANEVARO","reference":". PARALELA A LA CDRA. 6 DE LA AV. CANEVARO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.085366655704497","lng":"-77.04022637039473","isHub":false},{"id":"shalom-78","name":"Agencia Shalom AV. LAS PALMERAS - LOS OLIVOS","zone":"Lima Norte","district":"LOS OLIVOS","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. LAS PALMERAS N° 5236 URB. VILLA NORTE - LOS OLIVOS","reference":"Recepcion y despacho de carga en LOS OLIVOS","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.975852939682618","lng":"-77.07207437848116","isHub":false},{"id":"shalom-79","name":"Agencia Shalom PRO - LOS OLIVOS","zone":"Lima Norte","district":"LOS OLIVOS","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. LOS PRÓCERES MZ. PP2 LT.21, URB. PUERTAS DE PRO - LOS OLIVOS","reference":"Recepcion y despacho de carga en LOS OLIVOS","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.9450493","lng":"-77.0775764","isHub":false},{"id":"shalom-80","name":"Agencia Shalom AV. ANGELICA GAMARRA - LOS OLIVOS","zone":"Lima Norte","district":"LOS OLIVOS","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. ANGELICA GAMARRA DE LEON VALVERDE N° 621 URB EL TREBOL, LOS OLIVOS - LIMA, REF. A LA ALTURA DEL KFC / CRUCE CON AV. ALFA","reference":". A LA ALTURA DEL KFC / CRUCE CON AV. ALFA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.00564059430335","lng":"-77.06833392202753","isHub":false},{"id":"shalom-81","name":"Agencia Shalom AV HUANDOY CON MARAÑON - LOS OLIVOS","zone":"Lima Norte","district":"LOS OLIVOS","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. PRÓCERES, MZ. 3, LT. 23 A.H. LAURA CALLER - LOS OLIVOS, REFERENCIA: CRUCE ENTRE AV. HUANDOY Y MARAÑÓN","reference":"CRUCE ENTRE AV. HUANDOY Y MARAÑÓN","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.970678","lng":"-77.080356","isHub":false},{"id":"shalom-82","name":"Agencia Shalom AV. DOS DE OCTUBRE - LOS OLIVOS","zone":"Lima Norte","district":"LOS OLIVOS","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. 2 DE OCTUBRE MZ. H LT. 2 - LOS OLIVOS - PRO, REF. AV. 2 DE OCTUBRE CON AV. CANTA CALLAO, AL COSTADO DEL CENTRO DE SAlUD PRO","reference":". AV. 2 DE OCTUBRE CON AV. CANTA CALLAO, AL COSTADO DEL CENTRO DE SAlUD PRO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.95057177592816","lng":"-77.08493089999897","isHub":false},{"id":"shalom-83","name":"Agencia Shalom AV. CARLOS IZAGUIRRE CDRA. 14 - LOS OLIVOS","zone":"Lima Norte","district":"LOS OLIVOS","province":"LIMA","category":"Agencia Shalom Lima","address":"CALLE DAVID ALVA MANZANA H LOTE 4 URB. CAJABAMBA LOS OLIVOS - LIMA, REF. ENTRE LA AV. CARLOS IZAGUIRRE CON LA AV. UNIVERSITARIA (FRENTE AL COLEGIO PAMER)","reference":". ENTRE LA AV. CARLOS IZAGUIRRE CON LA AV. UNIVERSITARIA (FRENTE AL COLEGIO PAMER)","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.991719564563","lng":"-77.080444406224","isHub":false},{"id":"shalom-84","name":"Agencia Shalom AV. LOS PLATINOS - LOS OLIVOS","zone":"Lima Norte","district":"LOS OLIVOS","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. LOS PLATINOS N°. 259, MZ. A - LT. 17, URB. LOTIZACIÓN INDUSTRIAL INFANTAS LOS OLIVOS - LIMA, REF. A DOS CDRAS. Y MEDIA DE LA AV. ALFREDO MENDIOLA Y/O PANAMERICANA NORTE (ALTURA DEL PARADERO CASETA)","reference":". A DOS CDRAS. Y MEDIA DE LA AV. ALFREDO MENDIOLA Y/O PANAMERICANA NORTE (ALTURA DEL PARADERO CASETA)","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.970038188057043","lng":"-77.06456792944489","isHub":false},{"id":"shalom-85","name":"Agencia Shalom AV HUANDOY CON AV CENTRAL - LOS OLIVOS","zone":"Lima Norte","district":"LOS OLIVOS","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. HUANDOY MZA. 72 LTE. 54 P.J. P.M.V. “CONFRATERNIDAD” - AAHH. ENRIQUE MILLA OCHOA LOS OLIVOS - LIMA, REF. A UNA CDRA. DEL CRUCE CON AV. CENTRAL","reference":". A UNA CDRA. DEL CRUCE CON AV. CENTRAL","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.957822256001","lng":"-77.075944870551","isHub":false},{"id":"shalom-86","name":"Agencia Shalom SEGUNDA DE PRO - LOS OLIVOS","zone":"Lima Norte","district":"LOS OLIVOS","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. ALFREDO MENDIOLA 8161 URB. PRO, LOS OLIVOS - LIMA - LIMA, REF. A UNA CDRA. DEL COLEGIO JOSÉ MARÍA ARGUEDAS","reference":". A UNA CDRA. DEL COLEGIO JOSÉ MARÍA ARGUEDAS","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.933223203028","lng":"-77.073028216717","isHub":false},{"id":"shalom-87","name":"Agencia Shalom CD. TALLERES-HUACHIPA - LURIGANCHO","zone":"Lima Este","district":"LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"v","reference":"Recepcion y despacho de carga en LURIGANCHO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.0164326","lng":"-76.912636","isHub":false},{"id":"shalom-88","name":"Agencia Shalom CHOSICA - LURIGANCHO","zone":"Lima Este","district":"LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"EL SOL 124 (PARQUE ECHENIQUE) LURIGANCHO - CHOSICA","reference":"Recepcion y despacho de carga en LURIGANCHO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.933529281206","lng":"-76.693335095276","isHub":false},{"id":"shalom-89","name":"Agencia Shalom HUACHIPA CO - LURIGANCHO","zone":"Lima Este","district":"LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"HUACHIPA ESTE - MANZANA A18 LOTE 1, 2, 3 CALLE B, CALLE 08, CALLE A, REF. AL COSTADO DE INDUSTRIAS ELÉCTRICAS KBA","reference":". AL COSTADO DE INDUSTRIAS ELÉCTRICAS KBA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.935550288297","lng":"-76.868334300939","isHub":false},{"id":"shalom-90","name":"Agencia Shalom SANTA MARÍA DE HUACHIPA - LURIGANCHO","zone":"Lima Este","district":"LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. CIRCUNVALACIÓN MZ. A LT. 1 - D C - P SANTA MARÍA DE HUACHIPA - LURIGANCHO - CHOSICA, REF. ENTRE LA AV. CIRCUNVALACIÓN Y LA AV. HUACHIPA","reference":". ENTRE LA AV. CIRCUNVALACIÓN Y LA AV. HUACHIPA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.016439072071643","lng":"-76.91240974118337","isHub":false},{"id":"shalom-91","name":"Agencia Shalom HUACHIPA CO 2 - LURIGANCHO","zone":"Lima Este","district":"LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"HUACHIPA ESTE - MANZANA A18 LOTE 1, 2, 3 CALLE B, CALLE 08, CALLE A, REF. AL COSTADO DE INDUSTRIAS ELÉCTRICAS KBA","reference":". AL COSTADO DE INDUSTRIAS ELÉCTRICAS KBA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.935550288297","lng":"-76.868334300939","isHub":false},{"id":"shalom-92","name":"Agencia Shalom AV  LAS TORRES - LURIGANCHO","zone":"Lima Este","district":"LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. LAS TORRES SUB. LT. 18A - 1D, FUNDO HUACHIPA, PARCELA MEDIA, LURIGANCHO - LIMA - LIMA, REF. AL FRENTE DEL CRUCE CON AV. MEDIA LUNA","reference":". AL FRENTE DEL CRUCE CON AV. MEDIA LUNA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.988873744074","lng":"-76.934679070552","isHub":false},{"id":"shalom-93","name":"Agencia Shalom NUEVO LURIN","zone":"Lima Sur","district":"LURIN","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. ANTIGUA PANAMERICANA SUR KM 37 MZ C LT 17 - FUNDO LAS SALINAS  - referencia a cuadra y media del mercado virgen de las mercedes.","reference":"a cuadra y media del mercado virgen de las mercedes.","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.2819873","lng":"-76.8658386","isHub":false},{"id":"shalom-94","name":"Agencia Shalom PUENTE LURIN","zone":"Lima Sur","district":"LURIN","province":"LIMA","category":"Agencia Shalom Lima","address":"ANTIGUA PANAMERICANA SUR, LOTE 2, MZ. B, PRIMER PISO LURÍN - LIMA, REF. A CDRA. Y MEDIA DEL CRUCE CON AV. SANTA CRUZ","reference":". A CDRA. Y MEDIA DEL CRUCE CON AV. SANTA CRUZ","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.25508377880026","lng":"-76.89009010408147","isHub":false},{"id":"shalom-95","name":"Agencia Shalom MAGDALENA DEL MAR","zone":"Lima Centro","district":"MAGDALENA DEL MAR","province":"LIMA","category":"Agencia Shalom Lima","address":"JR. AYACUCHO N° 756, REFERENCIA: A UNA CDRA. DEL MERCADO MODELO DE MAGDALESY A 3 CDRAS. DE LA IGLESIA CÚPULA DE SUCRE","reference":"A UNA CDRA. DEL MERCADO MODELO DE MAGDALESY A 3 CDRAS. DE LA IGLESIA CÚPULA DE SUCRE","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.086209998878","lng":"-77.071422971786","isHub":false},{"id":"shalom-96","name":"Agencia Shalom AV. LA MARINA - PUEBLO LIBRE","zone":"Lima Centro","district":"PUEBLO LIBRE","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. LA MARINA 1640 - REFERENCIA :  A UNA CUADRA DEL CENTRO COMERCIAL PLAZA SAN MIGUEL","reference":":  A UNA CUADRA DEL CENTRO COMERCIAL PLAZA SAN MIGUEL","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.0775694","lng":"-77.0799465","isHub":false},{"id":"shalom-97","name":"Agencia Shalom AV  BOLIVAR - PUEBLO LIBRE","zone":"Lima Centro","district":"PUEBLO LIBRE","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. BOLIVAR 1097, PUEBLO LIBRE - LIMA, REF. A MEDIA CDRA. DEL CRUCE AV. GRAL. JOSÉ MARÍA EGUSQUIZA","reference":". A MEDIA CDRA. DEL CRUCE AV. GRAL. JOSÉ MARÍA EGUSQUIZA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.072414855721524","lng":"-77.06500307055026","isHub":false},{"id":"shalom-98","name":"Agencia Shalom AV. JOSE PARDO - MIRAFLORES","zone":"Lima Centro","district":"MIRAFLORES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. JOSE PARDO N?533","reference":"Recepcion y despacho de carga en MIRAFLORES","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 14:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.119319117645","lng":"-77.034353944233","isHub":false},{"id":"shalom-99","name":"Agencia Shalom CALLE BERLIN - MIRAFLORES","zone":"Lima Centro","district":"MIRAFLORES","province":"LIMA","category":"Agencia Shalom Lima","address":"Calle Berlín 219  - Miraflores","reference":"Recepcion y despacho de carga en MIRAFLORES","gateHours":"L-V: 09:00 a 18:00 | Sab: 09:00 a 18:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.121881114037542","lng":" -77.03219965402278","isHub":false},{"id":"shalom-100","name":"Agencia Shalom AV. ROOSEVELT - MIRAFLORES","zone":"Lima Centro","district":"MIRAFLORES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. ROOSEVELT 6297 (ANTES REP. PANAMÁ) - MIRAFLORES","reference":"Recepcion y despacho de carga en MIRAFLORES","gateHours":"L-V: 09:00 a 18:00 | Sab: 09:00 a 13:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.12746185891619","lng":"-77.01786268247683","isHub":false},{"id":"shalom-101","name":"Agencia Shalom AV. ALFREDO BENAVIDES - MIRAFLORES","zone":"Lima Centro","district":"MIRAFLORES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. ALFREDO BENAVIDES 1851 - MIRAFLORES, REF. AL COSTADO DEL BEMBOS AURORA BENAVIDES","reference":". AL COSTADO DEL BEMBOS AURORA BENAVIDES","gateHours":"L-V: 08:00 a 19:00 | Sab: 09:00 a 14:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.126749176455","lng":"-77.013223328823","isHub":false},{"id":"shalom-102","name":"Agencia Shalom AV. COMANDANTE ESPINAR - MIRAFLORES","zone":"Lima Centro","district":"MIRAFLORES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. COMANDANTE ESPINAR 330-MIRAFLORES, REF. ENTRE EL CRUCE DE CALLE ENRIQUE PALACIOS Y LA AV. COMANDANTE ESPINAR","reference":". ENTRE EL CRUCE DE CALLE ENRIQUE PALACIOS Y LA AV. COMANDANTE ESPINAR","gateHours":"L-V: 08:00 a 19:00 | Sab: 09:00 a 14:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.116361361085","lng":"-77.036806493898","isHub":false},{"id":"shalom-103","name":"Agencia Shalom LARCOMAR - MIRAFLORES","zone":"Lima Centro","district":"MIRAFLORES","province":"LIMA","category":"Agencia Shalom Lima","address":"MALECÓN DE LA RESERVA 610, MIRAFLORES 15074, MIRAFLORES - LIMA - LIMA, REF. SÓTANO NIVEL A","reference":". SÓTANO NIVEL A","gateHours":"L-V: 10:00 a 18:00 | Sab: 10:00 a 18:00 | Dom: 10:00 a 18:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.131762515208","lng":"-77.030074212422","isHub":false},{"id":"shalom-104","name":"Agencia Shalom LA CURVA DE MANCHAY - PACHACAMAC","zone":"Lima Sur","district":"PACHACAMAC","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. PROLONGACIÓN DE LA AV. LA MOLINA MZ. E LOTE 21. AH PAUL POBLET LIND, PACHACAMAC - LIMA, REF. A MEDIA CDRA. DE MI BANCO","reference":". A MEDIA CDRA. DE MI BANCO","gateHours":"L-V: 08:00 a 19:00 | Sab: 08:00 a 19:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.084751211026502","lng":"-76.8761664787276","isHub":false},{"id":"shalom-105","name":"Agencia Shalom MANCHAY TRES MARIAS - PACHACAMAC","zone":"Lima Sur","district":"PACHACAMAC","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. VICTOR MALASQUEZ MZ. B11 SUB-LOTE 06-A - AAHH CENTRO POBLADO RURAL LOS HUERTOS DE MANCHAY SECTOR B PACHACAMAC - LIMA, REF.  A MEDIA CDRA. DEL PARADERO","reference":".  A MEDIA CDRA. DEL PARADERO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.114362937395487","lng":"-76.87350734288519","isHub":false},{"id":"shalom-106","name":"Agencia Shalom AV MANUEL VALLE - PACHACAMAC","zone":"Lima Sur","district":"PACHACAMAC","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. MANUEL VALLE SUB - LOTE 2 - 1, NÚMERO DE PARCELA J, PROYECTO HUERTOS DE PACHACAMAC, VALLE LURÍN - PACHACAMAC - LIMA, REF. FRENTE AL ESTUDIO DE CANAL 4 (AMERICA TELEVISIÓN)","reference":". FRENTE AL ESTUDIO DE CANAL 4 (AMERICA TELEVISIÓN)","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.232514555328416","lng":"-76.86432399999713","isHub":false},{"id":"shalom-107","name":"Agencia Shalom EL RETAMAL - PACHACAMAC","zone":"Lima Sur","district":"PACHACAMAC","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. VICTOR MALASQUEZ MZ. B LT. 16 – ASOCIACIÓN DE VIVIENDA “EL SOL DE SAN FERNANDO” ZONA 5 – QUEBRADA DE MANCHAY, REF. A 2 CDRAS. DEL CRUCE CON AV. UNIÓN","reference":". A 2 CDRAS. DEL CRUCE CON AV. UNIÓN","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.147095887089","lng":"-76.871512513949","isHub":false},{"id":"shalom-108","name":"Agencia Shalom PUENTE ARICA - PUENTE PIEDRA","zone":"Lima Norte","district":"PUENTE PIEDRA","province":"LIMA","category":"Agencia Shalom Lima","address":"PANAMERICANA NORTE  KM 32.5 , A 1/2  CUADRA DEL PUENTE ARICA  - AL COSTADO DEL GRIFO REPSOL","reference":"Recepcion y despacho de carga en PUENTE PIEDRA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.8531295","lng":"-77.088719","isHub":false},{"id":"shalom-109","name":"Agencia Shalom ZAPALLAL - PUENTE PIEDRA","zone":"Lima Norte","district":"PUENTE PIEDRA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. ANCÓN 678, REF. A LA ESPALDA DEL PRECIO UNO DE FUNDICION","reference":". A LA ESPALDA DEL PRECIO UNO DE FUNDICION","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.830750370122983","lng":"-77.11410941944563","isHub":false},{"id":"shalom-110","name":"Agencia Shalom AV. SAN LORENZO - PUENTE PIEDRA","zone":"Lima Norte","district":"PUENTE PIEDRA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. SAN LORENZO MZ C LT 20 - ADP VIRGEN DE COPACABANA, PUENTE PIEDRA - LIMA. REF, A MEDIA CUADRA DEL PARQUE VIRGEN DE COPACABANA","reference":", A MEDIA CUADRA DEL PARQUE VIRGEN DE COPACABANA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.856723599999995","lng":"-77.06764117055229","isHub":false},{"id":"shalom-111","name":"Agencia Shalom OVALO PUENTE PIEDRA","zone":"Lima Norte","district":"PUENTE PIEDRA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. MIGUEL GRAUÂ MZ. A LT. 07 Y 08 URB. SAN MARTIN DE PORRES, CERCADO PUENTE PIEDRA - LIMA, REF. ESPALDAS DE TOTTUS DE PUENTE PIEDRA","reference":". ESPALDAS DE TOTTUS DE PUENTE PIEDRA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.8690911986368","lng":"-77.0736756180273","isHub":false},{"id":"shalom-112","name":"Agencia Shalom AV BUENOS AIRES - PUENTE PIEDRA","zone":"Lima Norte","district":"PUENTE PIEDRA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. BUENOS AIRES MZ. D, SUB-LOTE 188E1 ASOCIACIÓN DE POBLADORESMICAELA BASTIDAS, PUENTE PIEDRA - LIMA - LIMA, REF. A 2 CDRAS. DE LA DEMUNA DE PUENTE PIEDRA","reference":". A 2 CDRAS. DE LA DEMUNA DE PUENTE PIEDRA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.8466089579004","lng":"-77.0980102328854","isHub":false},{"id":"shalom-113","name":"Agencia Shalom ALMACENES BSF - PUNTA HERMOSA","zone":"Lima Sur","district":"PUNTA HERMOSA","province":"LIMA","category":"Agencia Shalom Lima","address":"CAR. AUTOPISTA PANAMERICANA SUR N° 2001 (KM. 38) INTERIOR H02A - PUNTA HERMOSA","reference":"Recepcion y despacho de carga en PUNTA HERMOSA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.301470000005098","lng":"-76.78319325684035","isHub":false},{"id":"shalom-114","name":"Agencia Shalom PUNTA HERMOSA","zone":"Lima Sur","district":"PUNTA HERMOSA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. GARCIA RADA MZ.B LT.04, AAHH ASOCIACION DE VIVIENDA Y DESARROLLO INTEGRAL NUEVA GENERACION, PUNTA HERMOSA - LIMA, REF. A UNA CDRA. DEL PARADERO PEATONAL DE PUNTA HERMOSA","reference":". A UNA CDRA. DEL PARADERO PEATONAL DE PUNTA HERMOSA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.328301119458041","lng":"-76.82488673250228","isHub":false},{"id":"shalom-115","name":"Agencia Shalom RIMAC AV. AMANCAES","zone":"Lima Centro","district":"RIMAC","province":"LIMA","category":"Agencia Shalom Lima","address":"Av. Amancaes Nro. 644 urb. Ciudad y campo - Rimac","reference":"Recepcion y despacho de carga en RIMAC","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.0220967","lng":"-77.0306918","isHub":false},{"id":"shalom-116","name":"Agencia Shalom RIMAC GUARDIA REPUBLICANA CDRA. 9","zone":"Lima Centro","district":"RIMAC","province":"LIMA","category":"Agencia Shalom Lima","address":"SECCIÓN INMOBILIARIA N°2 – PRIMER PISO LT. 11 DE LA MZ. 2, URB. VILLACAMPA RIMAC, REF. A UNA CDRA. DEL CRUCE CON AV. FELIPE ARANCIBIA","reference":". A UNA CDRA. DEL CRUCE CON AV. FELIPE ARANCIBIA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.029694115562732","lng":"-77.03647277723022","isHub":false},{"id":"shalom-117","name":"Agencia Shalom AV. JAVIER PRADO - SAN BORJA","zone":"Lima Centro","district":"SAN BORJA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. JAVIER PRADO ESTE N? 1810 - EST. 05 MZ. A - 1 LT. 04","reference":"Recepcion y despacho de carga en SAN BORJA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 14:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.088864569703691","lng":"-77.00711528847536","isHub":false},{"id":"shalom-118","name":"Agencia Shalom AVIACION 2819 - SAN BORJA","zone":"Lima Centro","district":"SAN BORJA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. AVIACIÓN 2819, URB. SAN BORJA SUR, REFERENCIA: AL FRENTE DE BEMBOS","reference":"AL FRENTE DE BEMBOS","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.0966861","lng":"-77.0021534","isHub":false},{"id":"shalom-119","name":"Agencia Shalom AVIACION 2999 - SAN BORJA","zone":"Lima Centro","district":"SAN BORJA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. AVIACIÓN 2999, REFERENCIA: A 1 CDRA. DE LA ESTACIÓN DEL TREN SAN BORJA SUR","reference":"A 1 CDRA. DE LA ESTACIÓN DEL TREN SAN BORJA SUR","gateHours":"L-V: 08:00 a 20:00 | Sab: 09:00 a 14:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.099414","lng":"-77.001675","isHub":false},{"id":"shalom-120","name":"Agencia Shalom AV. ANGAMOS - SAN BORJA","zone":"Lima Centro","district":"SAN BORJA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. ANGAMOS ESTE 2521 (EX AV. PRIMAVERA) - CONJUNTO HABITACIONAL LIMATAMBO -  SAN BORJA. REF. CERCA AL CRUCE DE AV. ANGAMOS ESTE CON AV. PRINCIPAL","reference":". CERCA AL CRUCE DE AV. ANGAMOS ESTE CON AV. PRINCIPAL","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.111695444371","lng":"-77.004615170566","isHub":false},{"id":"shalom-121","name":"Agencia Shalom RIV. NAVARRETE - SAN ISIDRO","zone":"Lima Centro","district":"SAN ISIDRO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. RIVERA NAVARRETE 465, REFERENCIA: CRUCE DE JAVIER PRADO CON RIVERA NAVARRETE","reference":"CRUCE DE JAVIER PRADO CON RIVERA NAVARRETE","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 14:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.092087","lng":"-77.026871","isHub":false},{"id":"shalom-122","name":"Agencia Shalom CORPAC - SAN ISIDRO","zone":"Lima Centro","district":"SAN ISIDRO","province":"LIMA","category":"Agencia Shalom Lima","address":"CALLE 21 785, REFERENCIA: AL COSTADO DEL MINISTERIO DEL INTERIOR","reference":"AL COSTADO DEL MINISTERIO DEL INTERIOR","gateHours":"L-V: 08:00 a 19:00 | Sab: 09:00 a 14:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.097055","lng":"-77.014892","isHub":false},{"id":"shalom-123","name":"Agencia Shalom CALLE LAS BEGONIAS - SAN ISIDRO","zone":"Lima Centro","district":"SAN ISIDRO","province":"LIMA","category":"Agencia Shalom Lima","address":"CALLE LAS BEGONIAS 774 - SAN ISIDRO","reference":"Recepcion y despacho de carga en SAN ISIDRO","gateHours":"L-V: 09:00 a 18:00 | Sab: 09:00 a 13:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.09576161570898","lng":"-77.02598394628174","isHub":false},{"id":"shalom-124","name":"Agencia Shalom CALLE MIGUEL DASSO - SAN ISIDRO","zone":"Lima Centro","district":"SAN ISIDRO","province":"LIMA","category":"Agencia Shalom Lima","address":"CALLE MIGUEL DASSO 126 - SAN ISIDRO, REF. EN EL CRUCE DE CALLE LEONIDAS YEROVI Y CALLE MIGUEL DASSO","reference":". EN EL CRUCE DE CALLE LEONIDAS YEROVI Y CALLE MIGUEL DASSO","gateHours":"L-V: 08:00 a 19:00 | Sab: 09:00 a 14:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.105998898586","lng":"-77.040498779467","isHub":false},{"id":"shalom-125","name":"Agencia Shalom AV SANTA ROSA URB LOS ALAMOS - SAN JUAN DE LURIGANCHO","zone":"Lima Este","district":"SAN JUAN DE LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"Av. Santa Rosa MZ. D1 lote 1 Urb. Los Alamos 2da Etapa  - referencia altura de la cuadra 13 del paradero canto grande","reference":"altura de la cuadra 13 del paradero canto grande","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.965189930601","lng":"-76.997693918962","isHub":false},{"id":"shalom-126","name":"Agencia Shalom AV. 13 DE ENERO - SAN JUAN DE LURIGANCHO","zone":"Lima Este","district":"SAN JUAN DE LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. 13 DE ENERO Nº2057, URB. SAN HILARIÓN, REFERENCIA: CERCA A LA ESTACIÓN LOS POSTES","reference":"CERCA A LA ESTACIÓN LOS POSTES","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.997585","lng":"-77.005279","isHub":false},{"id":"shalom-127","name":"Agencia Shalom CRUZ DE MOTUPE - SAN JUAN DE LURIGANCHO","zone":"Lima Este","district":"SAN JUAN DE LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. FERNANDO WIESSE MZ. Q LOTE 1 AA.HH. CRUZ DE MOTUPE","reference":"Recepcion y despacho de carga en SAN JUAN DE LURIGANCHO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.938267731665","lng":"-76.975696450097","isHub":false},{"id":"shalom-128","name":"Agencia Shalom SJL- LAS FLORES - SAN JUAN DE LURIGANCHO","zone":"Lima Este","district":"SAN JUAN DE LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. CANTO GRANDE N°. 2570 - URB. GANIMEDES, REFERENCIA: A 3 CDRAS. DE PLAZA VEA","reference":"A 3 CDRAS. DE PLAZA VEA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.986444455930926","lng":"-77.01549062944763","isHub":false},{"id":"shalom-129","name":"Agencia Shalom SJL-AV.PROCERES - SAN JUAN DE LURIGANCHO","zone":"Lima Este","district":"SAN JUAN DE LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. PRÓCERES DE LA INDEPENDENCIA NRO.  1295 - 1299 REFERENCIA: AL COSTADO DEL BANCO DE LA NACIÓN DE AV. LOS TUSILAGOS OESTE","reference":"AL COSTADO DEL BANCO DE LA NACIÓN DE AV. LOS TUSILAGOS OESTE","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.012724544095","lng":"-77.002363933588","isHub":false},{"id":"shalom-130","name":"Agencia Shalom CANTO GRANDE - SAN JUAN DE LURIGANCHO","zone":"Lima Este","district":"SAN JUAN DE LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"CALLE SAN MARTIN CON AV. COMERCIAL NORTE 189 - SAN JUAN DE LURIGANCHO, REF. A 1/2 CUADRA DE LA AV 6 DE CANTO GRANDE - AL COSTADO DEL PLAY PARK (PARQUE BOLOGNESI)","reference":". A 1/2 CUADRA DE LA AV 6 DE CANTO GRANDE - AL COSTADO DEL PLAY PARK (PARQUE BOLOGNESI)","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.973898198595233","lng":"-77.00615208127309","isHub":false},{"id":"shalom-131","name":"Agencia Shalom LOS PINOS - SAN JUAN DE LURIGANCHO","zone":"Lima Este","district":"SAN JUAN DE LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"MZ. B1 LT. 25 URBANIZACIÓN LOS PINOS SAN JUAN DE LURIGANCHO, REF. AV. FERNANDO WIESSE - CERCA A LA ESTACIÓN SAN MARTÍN","reference":". AV. FERNANDO WIESSE - CERCA A LA ESTACIÓN SAN MARTÍN","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.973859486208","lng":"-76.999139704875","isHub":false},{"id":"shalom-132","name":"Agencia Shalom BAYOVAR - SAN JUAN DE LURIGANCHO","zone":"Lima Este","district":"SAN JUAN DE LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. FERNANDO WIESSE MZ. E8. LOTE 38B, MARISCAL CÁCERES BAYOVAR - SAN JUAN DE LURIGANCHO - LIMA, REF. AUXILIAR PRÓCERES DE LA INDEPENDENCIA, AL FRENTE DE LA UNIVERSIDAD SAN MARCOS – AGROINDUSTRIAL","reference":". AUXILIAR PRÓCERES DE LA INDEPENDENCIA, AL FRENTE DE LA UNIVERSIDAD SAN MARCOS – AGROINDUSTRIAL","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.952649328006302","lng":"-76.9868396646944","isHub":false},{"id":"shalom-133","name":"Agencia Shalom CAMPOY - SAN JUAN DE LURIGANCHO","zone":"Lima Este","district":"SAN JUAN DE LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. MALECÓN CHECA MZ. B LT. 7, URB. CAMPOY, SAN JUAN DE LURIGANCHO, REF. A 1 CDRA. DEL CRUCE DE AV. MALECÓN CHECA CON AV. SAN MARTÍN","reference":". A 1 CDRA. DEL CRUCE DE AV. MALECÓN CHECA CON AV. SAN MARTÍN","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.024684940555957","lng":"-76.96870763756485","isHub":false},{"id":"shalom-134","name":"Agencia Shalom AV. DEL MERCADO - SAN JUAN DE LURIGANCHO","zone":"Lima Este","district":"SAN JUAN DE LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"PROGRAMA CIUDAD MRCAL. CACERES, SECTOR III MZ. Q8 LT. 11 SAN JUAN DE LURIGANCHO - LIMA, REF. A MEDIA CDRA. DEL CRUCE DE AV. DEL MERCADO CON AV. AMPLIACION OESTE","reference":". A MEDIA CDRA. DEL CRUCE DE AV. DEL MERCADO CON AV. AMPLIACION OESTE","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.93887049947234","lng":"-76.9899343671839","isHub":false},{"id":"shalom-135","name":"Agencia Shalom JR CHINCHAYSUYO CDRA 4 - SAN JUAN DE LURIGANCHO","zone":"Lima Este","district":"SAN JUAN DE LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"JR. CHINCHAYSUYO 468 ZARATE, SAN JUAN DE LURIGANCHO - LIMA, REF. A 1 CDRA. DE TIENDAS 3 A","reference":". A 1 CDRA. DE TIENDAS 3 A","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.0235790","lng":"-77.0007220","isHub":false},{"id":"shalom-136","name":"Agencia Shalom AV CENTRAL SJL - SAN JUAN DE LURIGANCHO","zone":"Lima Este","district":"SAN JUAN DE LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. CENTRAL MZ R9 LOTE 3 PROGRAMA CIUDAD MRCAL. CACERES, SECTOR II, BARRIO 3, GRUPO RESIDENCIAL R - SAN JUAN DE LURIGANCHO, REF. EN MEDIO DEL CRUCE CON LAS AV. EL MURO Y AMPLIACION ESTE","reference":". EN MEDIO DEL CRUCE CON LAS AV. EL MURO Y AMPLIACION ESTE","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.948238651609","lng":"-76.97919847596","isHub":false},{"id":"shalom-137","name":"Agencia Shalom AV. SANTA ROSA CRUCE AV. EL SOL - SAN JUAN DE LURIGANCHO","zone":"Lima Este","district":"SAN JUAN DE LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. SANTA ROSA DE LIMA MZ. D LT. 4 - AAHH 2 DE SETIEMBRE - SAN JUAN DE LURIGANCHO, REF. A TRES CDRAS. DEL CRUCE CON AV. EL SOL","reference":". A TRES CDRAS. DEL CRUCE CON AV. EL SOL","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.98966604407686","lng":"-76.99894440000024","isHub":false},{"id":"shalom-138","name":"Agencia Shalom AV MALECON  CHECA CDRA. 1 - SAN JUAN DE LURIGANCHO","zone":"Lima Este","district":"SAN JUAN DE LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. MALECÓN MIGUEL CHECA EGUIGUREN N° 167 Y 169 DE LA URB. ZÁRATE, SJL - LIMA, REF. ESQUINA CON AV. GRAN CHIMÚ","reference":". ESQUINA CON AV. GRAN CHIMÚ","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.03068626503971","lng":"-77.01069288124661","isHub":false},{"id":"shalom-139","name":"Agencia Shalom AV CIRCUNVALACION SJL - SAN JUAN DE LURIGANCHO","zone":"Lima Este","district":"SAN JUAN DE LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. CIRCUNVALACIÓN MZ. B-5 LT. 20 AA. HH. SARGENTO FERNANDO LORES TENAZOA COMUNA 20, SAN JUAN DE LURIGANCHO - LIMA, REF. A DOS CDRAS. DEL COLEGIO RAMIRO PRIALE","reference":". A DOS CDRAS. DEL COLEGIO RAMIRO PRIALE","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.97117157272077","lng":"-76.9893916747466","isHub":false},{"id":"shalom-140","name":"Agencia Shalom pruebaTEST - SAN JUAN DE LURIGANCHO","zone":"Lima Este","district":"SAN JUAN DE LURIGANCHO","province":"LIMA","category":"Agencia Shalom Lima","address":"terminal de prueba bambamarca prueba de caracteres especiales en web de shalom U{HOWshvfisjvposrvjosv **","reference":"Recepcion y despacho de carga en SAN JUAN DE LURIGANCHO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"0","lng":"0","isHub":false},{"id":"shalom-141","name":"Agencia Shalom ATOCONGO - SAN JUAN DE MIRAFLORES","zone":"Lima Sur","district":"SAN JUAN DE MIRAFLORES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. DE LOS HÉROES N° 228 - SAN JUAN DE MIRAFLORES - (ESTACIÓN ATOCONGO)","reference":"Recepcion y despacho de carga en SAN JUAN DE MIRAFLORES","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.1518357","lng":"-76.9781867","isHub":false},{"id":"shalom-142","name":"Agencia Shalom MARIA AUXILIADORA - SAN JUAN DE MIRAFLORES","zone":"Lima Sur","district":"SAN JUAN DE MIRAFLORES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. LOS HÉROES 1140 - SJM, REFERENCIA: UNA CDRA. ANTES DEL HOSPITAL MARÍA AUXILIADORA","reference":"UNA CDRA. ANTES DEL HOSPITAL MARÍA AUXILIADORA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.158926","lng":"-76.960685","isHub":false},{"id":"shalom-143","name":"Agencia Shalom AV. CANEVARO - SAN JUAN DE MIRAFLORES","zone":"Lima Sur","district":"SAN JUAN DE MIRAFLORES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. CANEVARO 336 - A, REF. A 2 CUADRAS DE LA AV. VARGAS MACHUGA  Y A UNA CUADRA DE LA FISCALÍA PROVINCIAL PENAL DE S.J.M.","reference":". A 2 CUADRAS DE LA AV. VARGAS MACHUGA  Y A UNA CUADRA DE LA FISCALÍA PROVINCIAL PENAL DE S.J.M.","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.166336290865159","lng":"-76.9690565560943","isHub":false},{"id":"shalom-144","name":"Agencia Shalom AV MIGUEL GRAU  PAMPLONA ALTA - SAN JUAN DE MIRAFLORES","zone":"Lima Sur","district":"SAN JUAN DE MIRAFLORES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. ALMIRANTE MIGUEL GRAU MZ. Y3 LT. 29,PAMPLONA ALTA - SAN JUAN DE MIRAFLORES - LIMA, REF. A MEDIA CDRA. DEL MERCADO OLLANTAY PAMPLONAALTA","reference":". A MEDIA CDRA. DEL MERCADO OLLANTAY PAMPLONAALTA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.1367497811897","lng":"-76.9658882149969","isHub":false},{"id":"shalom-145","name":"Agencia Shalom AV  SAN JUAN PAMPLONA ALTA - SAN JUAN DE MIRAFLORES","zone":"Lima Sur","district":"SAN JUAN DE MIRAFLORES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. SAN JUAN MZ. 24 LT. 1, SECT. NUEVO HORIZONTE, PP. JJ PAMPLONA ALTA - SAN JUAN DE MIRAFLORES, REF. A 3 CDRAS. DEL CRUCE CON AV. SALVADOR ALLENDE","reference":". A 3 CDRAS. DEL CRUCE CON AV. SALVADOR ALLENDE","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.1462220555428","lng":"-76.9669646","isHub":false},{"id":"shalom-146","name":"Agencia Shalom AV LOS PRECURSORES - SAN JUAN DE MIRAFLORES","zone":"Lima Sur","district":"SAN JUAN DE MIRAFLORES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. LOS PRECURSORES MZ. B LT. 17 AA.HH EL INTI, SAN JUAN DE MIRAFLORES - LIMA - LIMA, REF. A 1 CDRA. DEL CRUCE CON AV. LOS PRÓCERES","reference":". A 1 CDRA. DEL CRUCE CON AV. LOS PRÓCERES","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.187290105723","lng":"-76.981656592911","isHub":false},{"id":"shalom-147","name":"Agencia Shalom PRUEBAAPOSUCURSAL - SAN LUIS","zone":"Lima Centro","district":"SAN LUIS","province":"LIMA","category":"Agencia Shalom Lima","address":"Calle rio Marañon 189","reference":"Recepcion y despacho de carga en SAN LUIS","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"1","lng":"1","isHub":false},{"id":"shalom-148","name":"Agencia Shalom FIORI - SAN MARTIN DE PORRES","zone":"Lima Norte","district":"SAN MARTIN DE PORRES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. MIGUEL ANGEL N° 235 - URB. FIORI 4TA ETAPA MZ. N-1 LT. 04 U.I N°6, SAN MARTÍN DE PORRES - LIMA, REF. A 1 CDRA. DEL CRUCE CON AV. MARCO POLO","reference":". A 1 CDRA. DEL CRUCE CON AV. MARCO POLO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.009873681812502","lng":"-77.05573138335198","isHub":false},{"id":"shalom-149","name":"Agencia Shalom AV. CANTA CALLAO  CON ALISOS - SAN MARTIN DE PORRES","zone":"Lima Norte","district":"SAN MARTIN DE PORRES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. CANTA CALLAO, MZ. A LT. 3 URB. ARIZONA - 2DA ETAPA","reference":"Recepcion y despacho de carga en SAN MARTIN DE PORRES","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.97783423","lng":"-77.09336287","isHub":false},{"id":"shalom-150","name":"Agencia Shalom SMP AV BERTELLO - SAN MARTIN DE PORRES","zone":"Lima Norte","district":"SAN MARTIN DE PORRES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. ALEJANDRO BERTELLO BOLLATI MZ. H LT. 2-A - ASOC. DE VIV. SAN REMO II ETAPA, SAN MARTÍN DE PORRES - LIMA - LIMA, REF. A MEDIA CDRA. DEL CRUCE CON AV. CANTA CALLAO","reference":". A MEDIA CDRA. DEL CRUCE CON AV. CANTA CALLAO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.995717209191","lng":"-77.113550598391","isHub":false},{"id":"shalom-151","name":"Agencia Shalom SMP-AV. PROCERES - SAN MARTIN DE PORRES","zone":"Lima Norte","district":"SAN MARTIN DE PORRES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. PRÓCERES N° 588 URB. COVICEM, REF. A 2 CDRAS. DE TOMÁS VALLE","reference":". A 2 CDRAS. DE TOMÁS VALLE","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.014500655852","lng":"-77.086998658861","isHub":false},{"id":"shalom-152","name":"Agencia Shalom AV. PERU 15 - SAN MARTIN DE PORRES","zone":"Lima Norte","district":"SAN MARTIN DE PORRES","province":"LIMA","category":"Agencia Shalom Lima","address":"Av. Perú 1589, San Martin de Porres -  Lima. Referencia: a dos cuadras del CruCe con la Av. Canadá.","reference":"a dos cuadras del CruCe con la Av. Canadá.","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.0327011","lng":"-77.0626605","isHub":false},{"id":"shalom-153","name":"Agencia Shalom AV. LIMA CDRA 38 - SAN MARTIN DE PORRES","zone":"Lima Norte","district":"SAN MARTIN DE PORRES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. LIMA 3899 - SMP, REF. A 3 CDRAS. DEL TOTTUS DE QUILCA CON AV. LIMA","reference":". A 3 CDRAS. DEL TOTTUS DE QUILCA CON AV. LIMA","gateHours":"L-V: 08:00 a 19:00 | Sab: 08:00 a 19:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.028420907156587","lng":"-77.0905094113077","isHub":false},{"id":"shalom-154","name":"Agencia Shalom AV. CARLOS IZAGUIRRE CUADRA 23 - SAN MARTIN DE PORRES","zone":"Lima Norte","district":"SAN MARTIN DE PORRES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. CARLOS IZAGUIRRE SUB LT. 8, MZ. C - ASOC. DE VIV. LOS NISPEROS, REFERENCIA: ENTRE AV. 12 DE OCTUBRE Y AV. SANTA ROSA","reference":"ENTRE AV. 12 DE OCTUBRE Y AV. SANTA ROSA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.990010","lng":"-77.094590","isHub":false},{"id":"shalom-155","name":"Agencia Shalom AV. GERARDO UNGER CDRA 64 - SAN MARTIN DE PORRES","zone":"Lima Norte","district":"SAN MARTIN DE PORRES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. GERARDO UNGER 6475, URB. SANTA LUISA, 1RA ETAPA, S.M.P., REF. ESQUINA CON AV. 22 DE AGOSTO, LÍMITE CON COMAS / A UNA CDRA. Y MEDIA DE LA COMISARIA SANTA LUZMILA","reference":". ESQUINA CON AV. 22 DE AGOSTO, LÍMITE CON COMAS / A UNA CDRA. Y MEDIA DE LA COMISARIA SANTA LUZMILA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.94597458951921","lng":"-77.0665273461935","isHub":false},{"id":"shalom-156","name":"Agencia Shalom GERMÁN AGUIRRE - SAN MARTIN DE PORRES","zone":"Lima Norte","district":"SAN MARTIN DE PORRES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. GERMAN AGUIRRE UGARTE 649 URB. SAN GERMAN - SAN MARTIN DE PORRES, REF. A LA ALTURA DE LA CUADRA 6 DE LA AV. GERMAN AGUIRRE Y A 3 CUADRAS DE AV. TOMAS VALLE","reference":". A LA ALTURA DE LA CUADRA 6 DE LA AV. GERMAN AGUIRRE Y A 3 CUADRAS DE AV. TOMAS VALLE","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.01520062837","lng":"-77.071383204114","isHub":false},{"id":"shalom-157","name":"Agencia Shalom AV JOSE GRANDA CDRA 38 - SAN MARTIN DE PORRES","zone":"Lima Norte","district":"SAN MARTIN DE PORRES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. JOSÉ GRANDA 3826 DE LA URB. CONDEVILLA SEÑOR Y VALDIVIESO MZ. M7 LT 20, 2 ETAPA, 2 SECTOR - S.M.P. , REF.  ENTRE AV. CONDEVILLA Y AV. LOS PRÓCERES","reference":".  ENTRE AV. CONDEVILLA Y AV. LOS PRÓCERES","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.020561244152566","lng":"-77.08705644110377","isHub":false},{"id":"shalom-158","name":"Agencia Shalom AV. DOMINICOS CDRA 14 - SAN MARTIN DE PORRES","zone":"Lima Norte","district":"SAN MARTIN DE PORRES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. LOS DOMINICOS 1460 - URB. LOS CIPRESES MZ. Z LT. 4 - SAN MARTÍN DE PORRES, REF. A UNA CDRA. DEL CRUCE CON AV. SANTA ROSA AL LADO DEL MERCADO LOS CIPRESES","reference":". A UNA CDRA. DEL CRUCE CON AV. SANTA ROSA AL LADO DEL MERCADO LOS CIPRESES","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.000236699984","lng":"-77.101816070595","isHub":false},{"id":"shalom-159","name":"Agencia Shalom AV JOSE GRANDA CDRA. 25 - SAN MARTIN DE PORRES","zone":"Lima Norte","district":"SAN MARTIN DE PORRES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. JOSE GRANDA 2546 - SAN MARTIN DE PORRES  -LIMA - LIMA, REF. A UNA CDRA. DEL ÓVALO JOSE GRANDA Y AV. UNIVERSITARIA","reference":". A UNA CDRA. DEL ÓVALO JOSE GRANDA Y AV. UNIVERSITARIA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.026653935000597","lng":"-77.07307865890112","isHub":false},{"id":"shalom-160","name":"Agencia Shalom AV. CANTA CALLAO CON IZAGUIRRE - SAN MARTIN DE PORRES","zone":"Lima Norte","district":"SAN MARTIN DE PORRES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. CANTA CALLAO MZ. A LT. 3 ASOC. BRISAS SANTA ROSA 1RA ETAPA, REF. A MEDIA CDRA. DEL COLEGIO AMISTAD Y/O A CUATRO CDRAS. DE LA AV. CARLOS IZAGUIRRE","reference":". A MEDIA CDRA. DEL COLEGIO AMISTAD Y/O A CUATRO CDRAS. DE LA AV. CARLOS IZAGUIRRE","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.985684244067","lng":"-77.102068570552","isHub":false},{"id":"shalom-161","name":"Agencia Shalom AV. UNIVERSITARIA CDRA. 16 - SAN MARTIN DE PORRES","zone":"Lima Norte","district":"SAN MARTIN DE PORRES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. UNIVERSITARIA 1619 - URB. MARIA GRACIA DE ANTARES MZ. B LT. 25 – SAN MARTIN DE PORRES - LIMA, REF. FRENTE AL PLAZA VEA DE UNIVERSITARIA CON TOMAS VALLE","reference":". FRENTE AL PLAZA VEA DE UNIVERSITARIA CON TOMAS VALLE","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.010046601589","lng":"-77.081589491522","isHub":false},{"id":"shalom-162","name":"Agencia Shalom AV  CENTRAL  SMP - SAN MARTIN DE PORRES","zone":"Lima Norte","district":"SAN MARTIN DE PORRES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. CENTRAL MZ. A LT. 07, URB. PROGRAMA DE VIVIENDA LUCERITO DE NARANJAL, SAN MARTÍN DE PORRES - LIMA - LIMA, REF. A 5 CDRAS. DEL CRUCE CON AV. TANTAMAYO","reference":". A 5 CDRAS. DEL CRUCE CON AV. TANTAMAYO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.959972288593","lng":"-77.091252270512","isHub":false},{"id":"shalom-163","name":"Agencia Shalom AV UNIVERSITARIA CON IZAGUIRRE - SAN MARTIN DE PORRES","zone":"Lima Norte","district":"SAN MARTIN DE PORRES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. UNIVERSITARIA MZ. D LT. 01 ASOCIACIÓN DE VIVIENDA SAN JUAN DE DIOS, SAN MARTÍN DE PORRES - LIMA - LIMA, REF. A 1 CDRA. DEL CRUCE CON AV. CARLOS IZAGUIRRE","reference":". A 1 CDRA. DEL CRUCE CON AV. CARLOS IZAGUIRRE","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.993691495867","lng":"-77.08386534618","isHub":false},{"id":"shalom-164","name":"Agencia Shalom SMP AV PACASMAYO - SAN MARTIN DE PORRES","zone":"Lima Norte","district":"SAN MARTIN DE PORRES","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. PACASMAYO MZ. A LT. 03 – URB. SANTA FE DE NARANJAL, SAN MARTÍN DE PORRES - LIMA - LIMA, REF. A 3 CDRAS. DEL CRUCE CON AV. EL SOL DE NARANJAL","reference":". A 3 CDRAS. DEL CRUCE CON AV. EL SOL DE NARANJAL","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.971120370669","lng":"-77.100521064793","isHub":false},{"id":"shalom-165","name":"Agencia Shalom AV. HUAROCHIRÍ - SANTA ANITA","zone":"Lima Este","district":"SANTA ANITA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. HUAROCHIRÍ MZ. E1 LT. 03 - URB. LOS CEDROS SANTA ANITA, REF. CRUCE DE AV. HUAROCHIRÍ CON AV. SANTA ANA","reference":". CRUCE DE AV. HUAROCHIRÍ CON AV. SANTA ANA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.041444176807","lng":"-76.952297800037","isHub":false},{"id":"shalom-166","name":"Agencia Shalom AV  SANTA ROSA - STA ANITA - SANTA ANITA","zone":"Lima Este","district":"SANTA ANITA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. SANTA ROSA #147 – URB. SANTA ANITA MZ. B1 LT. 08 UNIDAD INMOBILIARIA N° 1 - SANTA ANITA - LIMA, REF. A UNA CDRA. DE LA CARRETERA CENTRAL","reference":". A UNA CDRA. DE LA CARRETERA CENTRAL","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.05226684612813","lng":"-76.96148503819886","isHub":false},{"id":"shalom-167","name":"Agencia Shalom AV HUAROCHIRI ENVIOS - SANTA ANITA","zone":"Lima Este","district":"SANTA ANITA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. HUAROCHIRI MZ. D8 LT. 13, URB. LOS CEDROS, SANTA ANITA - LIMA, REF. A MEDIA CDRA. DEL CRUCE CON AV. SANTA ROSA","reference":". A MEDIA CDRA. DEL CRUCE CON AV. SANTA ROSA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.041806655130582","lng":"-76.95260172004053","isHub":false},{"id":"shalom-168","name":"Agencia Shalom URB UNIVERSAL - SANTA ANITA","zone":"Lima Este","district":"SANTA ANITA","province":"LIMA","category":"Agencia Shalom Lima","address":"JR. CESAR VALLEJO 302 MZ. B1 LT. 02 URB UNIVERSAL, SANTA ANITA- LIMA-LIMA, REF. A 1 CDRA. DEL CRUCE CON AV. TUPAC AMARU","reference":". A 1 CDRA. DEL CRUCE CON AV. TUPAC AMARU","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.043267502694624","lng":"-76.97980031394222","isHub":false},{"id":"shalom-169","name":"Agencia Shalom AV. FERROCARRIL - SANTA ANITA (POR DEFINIR)","zone":"Lima Este","district":"SANTA ANITA","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. EL FERROCARRIL 530 COOPERATIVA. LOS CHANCAS DE ANDAHUAYLAS MZ. F1 LT. 06, REF. A 2 CDRAS. DEL INNOVA SCHOOLS DE ATE VITARTE","reference":". A 2 CDRAS. DEL INNOVA SCHOOLS DE ATE VITARTE","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.038198554742","lng":"-76.971729239873","isHub":false},{"id":"shalom-170","name":"Agencia Shalom SANTA ROSA","zone":"Lima Norte","district":"SANTA ROSA","province":"LIMA","category":"Agencia Shalom Lima","address":"MZ. L 23 URB. COOVITIOMAR,  - SANTA ROSA - LIMA, REF. CRUCE DE INGRESO A SANTA ROSA Y/O AL COSTADO DE IMAGEN DE SANTA ROSA","reference":". CRUCE DE INGRESO A SANTA ROSA Y/O AL COSTADO DE IMAGEN DE SANTA ROSA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-11.785832663255","lng":"-77.154776871103","isHub":false},{"id":"shalom-171","name":"Agencia Shalom HIGUERETA - SANTIAGO DE SURCO","zone":"Lima Centro","district":"SANTIAGO DE SURCO","province":"LIMA","category":"Agencia Shalom Lima","address":"Calle Barlovento N° 134 REFERENCIA: A 3 CDRAS DE POLVOS ROSADOS, CERCA AL ÓVALO HIGUERETA, surco","reference":"A 3 CDRAS DE POLVOS ROSADOS, CERCA AL ÓVALO HIGUERETA, surco","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.128290656591","lng":"-76.999440079644","isHub":false},{"id":"shalom-172","name":"Agencia Shalom AV. PRIMAVERA 120 - SANTIAGO DE SURCO","zone":"Lima Centro","district":"SANTIAGO DE SURCO","province":"LIMA","category":"Agencia Shalom Lima","address":"Av. Primavera Nº 120 Tda. A-21 – Urb. Tambo de Monterrico","reference":"Recepcion y despacho de carga en SANTIAGO DE SURCO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 14:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.11155055108","lng":"-76.992886374212","isHub":false},{"id":"shalom-173","name":"Agencia Shalom AV. PRIMAVERA 1314 - SANTIAGO DE SURCO","zone":"Lima Centro","district":"SANTIAGO DE SURCO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. PRIMAVERA N° 1314, URB. C.C. MONTERRICO - SURCO, REFERENCIA: CRUCE JR. EL POLO","reference":"CRUCE JR. EL POLO","gateHours":"L-V: 09:00 a 18:00 | Sab: 09:00 a 13:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.11012859255803","lng":"-76.97482357045575","isHub":false},{"id":"shalom-174","name":"Agencia Shalom AV. PRIMAVERA 264 - SANTIAGO DE SURCO","zone":"Lima Centro","district":"SANTIAGO DE SURCO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. PRIMAVERA 264 TDA 187 C.C. CHACARILLA – SANTIAGO DE SURCO - LIMA - LIMA, REF. C.C. CHACARILLA PRIMER PISO (PUERTA PRINCIPAL DEL CENTRO COMERCIAL)","reference":". C.C. CHACARILLA PRIMER PISO (PUERTA PRINCIPAL DEL CENTRO COMERCIAL)","gateHours":"L-V: 09:00 a 19:00 | Sab: 09:00 a 14:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.111363118043785","lng":"-76.9913844045743","isHub":false},{"id":"shalom-175","name":"Agencia Shalom SURCO MATEO PUMACAHUA - SANTIAGO DE SURCO","zone":"Lima Centro","district":"SANTIAGO DE SURCO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. SAN JUAN MZ A LOTE 01 MATEO PUMACAHUA - SURCO, REF. A 2 CUADRAS DE LA AV. TUPAC AMARU ENTRE EL LÍMITE DE CHORRILLOS Y SURCO","reference":". A 2 CUADRAS DE LA AV. TUPAC AMARU ENTRE EL LÍMITE DE CHORRILLOS Y SURCO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.191080022844782","lng":"-76.98405895275964","isHub":false},{"id":"shalom-176","name":"Agencia Shalom AV. TOMÁS MARSANO - SANTIAGO DE SURCO","zone":"Lima Centro","district":"SANTIAGO DE SURCO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. TOMÁS MARSANO 3767 - SANTIAGO DE SURCO, REF. A MEDIA CUADRA DE LA ESTACIÓN DE TREN AYACUCHO","reference":". A MEDIA CUADRA DE LA ESTACIÓN DE TREN AYACUCHO","gateHours":"L-V: 08:00 a 19:00 | Sab: 08:00 a 14:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.135804736326572","lng":"-76.99589010595446","isHub":false},{"id":"shalom-177","name":"Agencia Shalom AV TOMAS MARSANO - LA BOLICHERA - SANTIAGO DE SURCO","zone":"Lima Centro","district":"SANTIAGO DE SURCO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. SANTIAGO DE SURCO Nº 4348, URBANIZACIÓN LA VIRREYNA, SANTIAGO DE SURCO - LIMA, REF. AL LADO DE INTECI SEDE SURCO","reference":". AL LADO DE INTECI SEDE SURCO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.14075536666277","lng":"-76.99291252944776","isHub":false},{"id":"shalom-178","name":"Agencia Shalom REP. DE PANAMA - SURQUILLO","zone":"Lima Centro","district":"SURQUILLO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV REPÚBLICA DE PANAMÁ N° 5115, REFERENCIA: costado del grifo Repsol.","reference":"costado del grifo Repsol.","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.1155255","lng":"-77.01815066","isHub":false},{"id":"shalom-179","name":"Agencia Shalom AV. ARAMBURU - SURQUILLO","zone":"Lima Centro","district":"SURQUILLO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. ARAMBURÚ 808, REFERENCIA: A 2 CDRAS. DE LA AV. PANAMÁ","reference":"A 2 CDRAS. DE LA AV. PANAMÁ","gateHours":"L-V: 08:00 a 19:00 | Sab: 09:00 a 14:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.102527","lng":"-77.022326","isHub":false},{"id":"shalom-180","name":"Agencia Shalom AV. PRINCIPAL - SURQUILLO","zone":"Lima Centro","district":"SURQUILLO","province":"LIMA","category":"Agencia Shalom Lima","address":"LT. 12 MZ. G, AV. PRINCIPAL 995 (EX AV. UNO) URB. LOS SAUCES 2DA ETAPA, SURQUILLO, REF. CRUCE CON A. MANUEL VILLARÁN","reference":". CRUCE CON A. MANUEL VILLARÁN","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.120399751438","lng":"-77.003503247772","isHub":false},{"id":"shalom-181","name":"Agencia Shalom AV. CESAR VALLEJO - VILLA EL SALVADOR","zone":"Lima Sur","district":"VILLA EL SALVADOR","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. CESAR VALLEJO, MZ. F LT. 1 - SECT. 2, REFERENCIA: FRENTE A ESSALUD, AL COSTADO DEL MERCADO VILLA SUR","reference":"FRENTE A ESSALUD, AL COSTADO DEL MERCADO VILLA SUR","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.210718983393","lng":"-76.932733043167","isHub":false},{"id":"shalom-182","name":"Agencia Shalom AV. PASTOR SEVILLA - VILLA EL SALVADOR","zone":"Lima Sur","district":"VILLA EL SALVADOR","province":"LIMA","category":"Agencia Shalom Lima","address":"MZ. B LT. 3 BARRIO 3 SECTOR 2 - 4TA ETAPA - VES, REFERENCIA: POR EL ÓVALO CERRO LOMAS, FRENTE AL COLEGIO VIRGEN DEL ROSARIO","reference":"POR EL ÓVALO CERRO LOMAS, FRENTE AL COLEGIO VIRGEN DEL ROSARIO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.242278748260654","lng":"-76.92582672867127","isHub":false},{"id":"shalom-183","name":"Agencia Shalom ÓVALO MARIÁTEGUI - VILLA EL SALVADOR","zone":"Lima Sur","district":"VILLA EL SALVADOR","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. PASTOR SEVILLA SECT. 6 - GP 7 - MZ. A - LOTE 05  - V.E.S., REF. A 2 CUADRAS DEL ÓVALO MARIÁTEGUI CON 3 DE OCTUBRE","reference":". A 2 CUADRAS DEL ÓVALO MARIÁTEGUI CON 3 DE OCTUBRE","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.222771994775695","lng":"-76.94317697476002","isHub":false},{"id":"shalom-184","name":"Agencia Shalom 01 DE MAYO - VILLA EL SALVADOR","zone":"Lima Sur","district":"VILLA EL SALVADOR","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. 01DE MAYO 1 SECT GP 23 - A MZ N LOTE 13 - V.E.S., REF. AV. PASTOR SEVILLA CON AV. 1 DE MAYO A 2 CUADRAS DEL HOSPITAL DE LA SOLIDARIDAD POR LA RUTA C","reference":". AV. PASTOR SEVILLA CON AV. 1 DE MAYO A 2 CUADRAS DEL HOSPITAL DE LA SOLIDARIDAD POR LA RUTA C","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.197813452067589","lng":"-76.95645150975598","isHub":false},{"id":"shalom-185","name":"Agencia Shalom Prueba sistemas - VILLA EL SALVADOR","zone":"Lima Sur","district":"VILLA EL SALVADOR","province":"LIMA","category":"Agencia Shalom Lima","address":"av pruebas.","reference":"Recepcion y despacho de carga en VILLA EL SALVADOR","gateHours":"L-V: 08:00 a 20:00 | Sab: 07:00 a 13:00 | Dom: 09:00 a 14:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-16.414719927538","lng":"-76.992912529448","isHub":false},{"id":"shalom-186","name":"Agencia Shalom AV REVOLUCIÓN - VILLA EL SALVADOR","zone":"Lima Sur","district":"VILLA EL SALVADOR","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. REVOLUCIÓN MZ. J LT. 19, SECTOR TERCERO, GRUPO RESIDENCIAL 9, PUEBLO JOVEN VILLA EL SALVADOR, VILLA EL SALVADOR - LIMA - LIMA, REF. CERCA AL CRUCE CON AV. JOSE CARLOS MARIATEGUI","reference":". CERCA AL CRUCE CON AV. JOSE CARLOS MARIATEGUI","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.21992881072","lng":"-76.932644770566","isHub":false},{"id":"shalom-187","name":"Agencia Shalom LAS CONCHITAS - VILLA MARIA DEL TRIUNFO","zone":"Lima Sur","district":"VILLA MARIA DEL TRIUNFO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. PACHACUTEC 6779, MZ. N, LT. 20, VILLA MARIA DEL TRIUNFO - REFERENCIA: A UNA CDRA. DEL GRIFO REPSOL LAS CONCHITAS","reference":"A UNA CDRA. DEL GRIFO REPSOL LAS CONCHITAS","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.208631","lng":"-76.9259818","isHub":false},{"id":"shalom-188","name":"Agencia Shalom PESQUERO - VILLA MARIA DEL TRIUNFO","zone":"Lima Sur","district":"VILLA MARIA DEL TRIUNFO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. PACHACUTEC N° 3548, REFERENCIA: FRENTE A REAL PLAZA, A 1 CDRA. DE MAYORSA","reference":"FRENTE A REAL PLAZA, A 1 CDRA. DE MAYORSA","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.179083535105955","lng":"-76.94455568962945","isHub":false},{"id":"shalom-189","name":"Agencia Shalom AV. LIMA - VMT - VILLA MARIA DEL TRIUNFO","zone":"Lima Sur","district":"VILLA MARIA DEL TRIUNFO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. LIMA 2208 JOSÉ GÁLVEZ- VILLA MARÍA  DEL TRIUNFO, REFERENCIA: A DOS CDRAS. DE LA CURVA JOSÉ GÁLVEZ","reference":"A DOS CDRAS. DE LA CURVA JOSÉ GÁLVEZ","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.226053","lng":"-76.908879","isHub":false},{"id":"shalom-190","name":"Agencia Shalom AV. VILLA MARIA - VILLA MARIA DEL TRIUNFO","zone":"Lima Sur","district":"VILLA MARIA DEL TRIUNFO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV VILLA MARIA  MZ. G12 LT. 9 - B PS 1 SECT. VILLA MARIA DEL TRIUNFO, REF. AV. VILLA MARIA  A 2 CUADRAS DE LA MUNICIPALIDAD DE VMT Y AL COSTADO DE ESSALUD","reference":". AV. VILLA MARIA  A 2 CUADRAS DE LA MUNICIPALIDAD DE VMT Y AL COSTADO DE ESSALUD","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.160054167398743","lng":"-76.94150305828285","isHub":false},{"id":"shalom-191","name":"Agencia Shalom NUEVA ESPERANZA VMT - VILLA MARIA DEL TRIUNFO","zone":"Lima Sur","district":"VILLA MARIA DEL TRIUNFO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. 26 DE NOVIEMBRE, 1728B - 1728C MZ. 90 SUB LOTE. 19B PUEBLO JOVEN NUEVA ESPERANZA, VILLA MARIA DEL TRIUNFO - LIMA, REF. A 3 CDRAS. DEL MERCADO VIRGEN DE LOURDES","reference":". A 3 CDRAS. DEL MERCADO VIRGEN DE LOURDES","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.167552525986567","lng":"-76.92398425823932","isHub":false},{"id":"shalom-192","name":"Agencia Shalom LA TABLADA ZONA NUEVA - VILLA MARIA DEL TRIUNFO","zone":"Lima Sur","district":"VILLA MARIA DEL TRIUNFO","province":"LIMA","category":"Agencia Shalom Lima","address":"AV. PACHACÚTEC N° 4465, MZ. 36, LT. 18 ZONA NUEVA ESPERANZA - P.J. CÉSAR VALLEJO - VILLA MARÍA DEL TRIUNFO - LIMA - LIMA, REF. AL FRENTE DEL CRUCE CON AV. 01 DE MAYO","reference":". AL FRENTE DEL CRUCE CON AV. 01 DE MAYO","gateHours":"L-V: 08:00 a 20:00 | Sab: 08:00 a 20:00 | Dom: 08:00 a 17:00","epp":"Chaleco reflectivo y zapatos de seguridad obligatorios","phone":"(01) 500-7878 / 987 576 777","lat":"-12.187781031186","lng":"-76.938656958167","isHub":false}],
  evaluations: []
};

// ==========================================
// 2. INICIALIZACIÓN AL CARGAR LA PÁGINA
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  loadSavedEvaluations();
  renderMonitors();
  populateDistrictSelect();
  renderAgencies();
  renderDriversList();
  setupSignatureCanvases();
  updateDriverUI();
  updateClock();
  setInterval(updateClock, 1000);
});

// ==========================================
// 3. NAVEGACIÓN ENTRE MÓDULOS
// ==========================================
function openModule(moduleId) {
  // Ocultar todos los paneles
  document.querySelectorAll(".view-panel").forEach((panel) => {
    panel.classList.remove("active");
  });

  // Mostrar el panel solicitado
  const targetId = "view" + moduleId.charAt(0).toUpperCase() + moduleId.slice(1);
  const targetPanel = document.getElementById(targetId);
  if (targetPanel) {
    targetPanel.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Si abrimos la evaluación post-ruta, refrescamos el chofer y canvas
  if (moduleId === "evaluacionRuta") {
    document.getElementById("evalDriverName").value = AppState.activeDriver.name;
    document.getElementById("evalTruckPlate").value = AppState.activeDriver.plate;
    renderEvaluationHistory();
    resizeCanvas(evalCanvas, evalCtx);
  }

  // Si abrimos la práctica de app, refrescamos el canvas del simulador
  if (moduleId === "practicaApp") {
    resizeCanvas(simCanvas, simCtx);
  }

  // Si abrimos agencias y direcciones, refrescamos el listado y distritos
  if (moduleId === "agencias") {
    populateDistrictSelect();
    filterAgencies();
    setTimeout(() => {
      const target = document.getElementById("agencySearchInput") || document.getElementById("agenciesList");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 150);
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

function showDashboard() {
  document.querySelectorAll(".view-panel").forEach((panel) => {
    panel.classList.remove("active");
  });
  document.getElementById("viewDashboard").classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (window.lucide) {
    lucide.createIcons();
  }
}

// ==========================================
// 4. GESTIÓN DE PERFILES Y DNI
// ==========================================
function updateDriverUI() {
  document.getElementById("headerUserName").textContent = AppState.activeDriver.name;
  const simName = document.getElementById("simDriverName");
  if (simName) simName.textContent = AppState.activeDriver.name;
  const evalDriver = document.getElementById("evalDriverName");
  if (evalDriver) evalDriver.value = AppState.activeDriver.name;
}

function openDniModal() {
  renderDriversList();
  document.getElementById("modalDni").classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function closeDniModal() {
  document.getElementById("modalDni").classList.add("hidden");
}

function renderDriversList() {
  const container = document.getElementById("driversListContainer");
  if (!container) return;

  container.innerHTML = AppState.driversList.map((driver) => {
    const isActive = driver.name === AppState.activeDriver.name;
    return `
      <div class="flex items-center justify-between p-3 rounded-xl border ${isActive ? "border-rose-400 bg-rose-50/60" : "border-slate-200 bg-white"}">
        <div>
          <div class="font-bold text-xs text-slate-800 flex items-center gap-1.5">
            ${driver.name}
            ${isActive ? '<span class="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-semibold">Activo</span>' : ""}
          </div>
          <div class="text-[11px] text-slate-500">
            DNI: <strong>${driver.dni}</strong> • Cat: ${driver.license} • <span class="text-emerald-600 font-semibold">${driver.status}</span>
          </div>
        </div>
        ${!isActive ? `
          <button onclick="selectDriver('${driver.name}')" class="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg transition">
            Seleccionar
          </button>
        ` : `
          <span class="text-xs text-rose-600 font-bold">En uso</span>
        `}
      </div>
    `;
  }).join("");
}

function selectDriver(name) {
  const found = AppState.driversList.find((d) => d.name === name);
  if (found) {
    AppState.activeDriver = {
      name: found.name,
      dni: found.dni,
      license: found.license,
      role: "Conductor",
      plate: "B7A-892"
    };
    updateDriverUI();
    renderDriversList();
    closeDniModal();
  }
}

function registerNewDriver() {
  const nameInput = document.getElementById("newDriverName");
  const dniInput = document.getElementById("newDriverDni");
  const name = nameInput.value.trim();
  const dni = dniInput.value.trim();

  if (!name || dni.length < 8) {
    alert("Por favor ingresa un nombre completo y un DNI válido de 8 dígitos.");
    return;
  }

  AppState.driversList.push({
    name,
    dni,
    license: "A-IIb",
    status: "En Capacitación"
  });

  nameInput.value = "";
  dniInput.value = "";
  renderDriversList();
  alert(`Chofer ${name} registrado con éxito en el sistema de capacitación.`);
}

function logoutPrompt() {
  if (confirm("¿Deseas cerrar la sesión del portal de choferes?")) {
    alert("Sesión finalizada. Gracias por tu jornada segura.");
    location.reload();
  }
}

// ==========================================
// 5. MÓDULO: SIMULADOR DE APP CHOFERES
// ==========================================
let simScannedCount = 0;
let simHasSignature = false;
let simHasPhoto = false;

function switchPracticeTab(tab) {
  const simBtn = document.getElementById("tabBtnSimulator");
  const guidesBtn = document.getElementById("tabBtnGuides");
  const simTab = document.getElementById("practiceTabSimulator");
  const guidesTab = document.getElementById("practiceTabGuides");

  if (tab === "simulator") {
    simBtn.className = "pb-3 text-sm font-bold border-b-2 border-rose-600 text-rose-600";
    guidesBtn.className = "pb-3 text-sm font-bold border-b-2 border-transparent text-slate-500 hover:text-slate-800";
    simTab.classList.remove("hidden");
    guidesTab.classList.add("hidden");
  } else {
    guidesBtn.className = "pb-3 text-sm font-bold border-b-2 border-rose-600 text-rose-600";
    simBtn.className = "pb-3 text-sm font-bold border-b-2 border-transparent text-slate-500 hover:text-slate-800";
    guidesTab.classList.remove("hidden");
    simTab.classList.add("hidden");
  }
  if (window.lucide) lucide.createIcons();
}

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const clockEl = document.getElementById("phoneClock");
  if (clockEl) clockEl.textContent = `${hours}:${minutes}`;
}

function simGoToStep(stepNumber) {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`simStep${i}`);
    if (el) el.classList.add("hidden");
  }
  const currentStep = document.getElementById(`simStep${stepNumber}`);
  if (currentStep) currentStep.classList.remove("hidden");

  if (stepNumber === 1) {
    simScannedCount = 0;
    simHasSignature = false;
    simHasPhoto = false;
  }

  if (stepNumber === 2) {
    updateScanStatusUI();
  }

  if (stepNumber === 3) {
    resizeCanvas(simCanvas, simCtx);
  }

  if (window.lucide) lucide.createIcons();
}

// Simular escáner de códigos de barra con pitido Web Audio API
function simTriggerScan() {
  if (simScannedCount < 3) {
    simScannedCount++;
    playScannerBeep();
    updateScanStatusUI();
  }
}

function playScannerBeep() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1760, audioCtx.currentTime); // Tono de escáner agudo
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.12);
  } catch (e) {
    console.log("Audio not supported or blocked");
  }
}

function updateScanStatusUI() {
  const statusEl = document.getElementById("simScanStatus");
  const toDeliverBtn = document.getElementById("simBtnToDeliver");
  const scanBtn = document.getElementById("simBtnScan");

  if (simScannedCount >= 3) {
    statusEl.innerHTML = `<span class="text-emerald-400 font-bold">✔ 3/3 Bultos Validados con Éxito</span>`;
    toDeliverBtn.removeAttribute("disabled");
    toDeliverBtn.classList.remove("opacity-50", "cursor-not-allowed");
    scanBtn.textContent = "Todos los bultos escaneados";
    scanBtn.classList.add("opacity-60");
  } else {
    statusEl.textContent = `Bulto ${simScannedCount + 1}/3: Esperando escaneo...`;
    toDeliverBtn.setAttribute("disabled", "true");
    toDeliverBtn.classList.add("opacity-50", "cursor-not-allowed");
    scanBtn.textContent = `Escanear Bulto (${simScannedCount}/3)`;
    scanBtn.classList.remove("opacity-60");
  }
}

function simTakePhoto() {
  simHasPhoto = true;
  const photoBox = document.getElementById("simPhotoBox");
  photoBox.innerHTML = `
    <div class="flex items-center gap-2 text-emerald-700 bg-emerald-50 w-full h-full p-2 rounded-lg justify-center font-semibold">
      <i data-lucide="check" class="w-4 h-4"></i> Foto registrada (Fachada y Guía física)
    </div>
  `;
  if (window.lucide) lucide.createIcons();
}

function simCompleteDelivery() {
  if (!simHasSignature && !isCanvasDrawn(simCanvas)) {
    alert("Para completar la entrega conforme se requiere la firma digital del cliente.");
    return;
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  document.getElementById("simSummaryTime").textContent = timeStr;
  simGoToStep(4);
}

function simTriggerRejection() {
  const reason = prompt(
    "Selecciona el motivo de rechazo o no entrega:\n1. Cliente ausente (cerrado)\n2. Rechazo por mercadería dañada\n3. Dirección errónea o inaccesible\n\nEscribe el motivo:",
    "Cliente ausente (local cerrado tras 15 min de espera)"
  );
  if (reason) {
    alert(`Incidencia registrada: "${reason}". Notificando automáticamente al monitor de Huachipa.`);
    simGoToStep(1);
  }
}

// ==========================================
// 6. DIBUJO EN CANVAS DE FIRMA DIGITAL
// ==========================================
let simCanvas, simCtx, evalCanvas, evalCtx;
let drawing = false;

function setupSignatureCanvases() {
  simCanvas = document.getElementById("simCanvasSignature");
  if (simCanvas) {
    simCtx = simCanvas.getContext("2d");
    attachCanvasEvents(simCanvas, simCtx);
  }

  evalCanvas = document.getElementById("evalCanvasSignature");
  if (evalCanvas) {
    evalCtx = evalCanvas.getContext("2d");
    attachCanvasEvents(evalCanvas, evalCtx);
  }
}

function resizeCanvas(canvas, ctx) {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  if (rect.width > 0 && rect.height > 0) {
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#1e293b";
  }
}

function attachCanvasEvents(canvas, ctx) {
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function startDraw(e) {
    e.preventDefault();
    drawing = true;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function draw(e) {
    if (!drawing) return;
    e.preventDefault();
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function stopDraw(e) {
    if (drawing) {
      drawing = false;
      ctx.closePath();
    }
  }

  canvas.addEventListener("mousedown", startDraw);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDraw);
  canvas.addEventListener("mouseleave", stopDraw);

  canvas.addEventListener("touchstart", startDraw, { passive: false });
  canvas.addEventListener("touchmove", draw, { passive: false });
  canvas.addEventListener("touchend", stopDraw);
}

function isCanvasDrawn(canvas) {
  if (!canvas) return false;
  const ctx = canvas.getContext("2d");
  const pixelBuffer = new Uint32Array(
    ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer
  );
  return pixelBuffer.some((color) => color !== 0);
}

function simClearSignature() {
  if (simCtx && simCanvas) {
    simCtx.clearRect(0, 0, simCanvas.width, simCanvas.height);
    simHasSignature = false;
  }
}

function clearEvalSignature() {
  if (evalCtx && evalCanvas) {
    evalCtx.clearRect(0, 0, evalCanvas.width, evalCanvas.height);
  }
}

// ==========================================
// 7. MÓDULO: SOPORTE DE MONITORES & WHATSAPP
// ==========================================
function renderMonitors(filteredList = null) {
  const list = filteredList || AppState.monitors;
  const container = document.getElementById("monitorsGrid");
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="col-span-2 text-center py-8 text-slate-500 text-sm">
        No se encontraron monitores con los criterios de búsqueda.
      </div>
    `;
    return;
  }

  container.innerHTML = list.map((m) => {
    const waMessage = encodeURIComponent(
      `Hola Monitor ${m.name}, soy el chofer ${AppState.activeDriver.name} con unidad ${AppState.activeDriver.plate}. Solicito soporte en mi ruta.`
    );
    const waLink = `https://wa.me/51${m.phone}?text=${waMessage}`;

    return `
      <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow transition flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-lg">
                ${m.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-base leading-tight">${m.name}</h4>
                <p class="text-xs text-rose-600 font-semibold">${m.role}</p>
              </div>
            </div>
            <span class="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-${m.statusColor}-50 text-${m.statusColor}-700 border border-${m.statusColor}-200 font-semibold">
              <span class="w-1.5 h-1.5 rounded-full bg-${m.statusColor}-500"></span> ${m.status}
            </span>
          </div>

          <div class="mt-4 space-y-1 text-xs text-slate-600">
            <div>📍 <strong>Cobertura:</strong> ${m.zoneLabel}</div>
            <div>⏰ <strong>Horario:</strong> ${m.schedule}</div>
            <div>📞 <strong>Celular:</strong> +51 ${m.phone}</div>
          </div>
        </div>

        <div class="mt-5 pt-3 border-t border-slate-100 flex gap-2">
          <a href="${waLink}" target="_blank" class="btn-whatsapp flex-1 justify-center">
            <i data-lucide="message-circle" class="w-4 h-4"></i> WhatsApp
          </a>
          <a href="tel:${m.phone}" class="btn-call px-4">
            <i data-lucide="phone" class="w-4 h-4"></i> Llamar
          </a>
        </div>
      </div>
    `;
  }).join("");

  if (window.lucide) lucide.createIcons();
}

function filterMonitors() {
  const query = document.getElementById("monitorSearchInput").value.toLowerCase().trim();
  const zone = document.getElementById("monitorZoneFilter").value;

  const filtered = AppState.monitors.filter((m) => {
    const matchesQuery =
      m.name.toLowerCase().includes(query) ||
      m.role.toLowerCase().includes(query) ||
      m.zoneLabel.toLowerCase().includes(query);
    const matchesZone = zone === "all" || m.zone === zone;
    return matchesQuery && matchesZone;
  });

  renderMonitors(filtered);
}

// ==========================================
// 8. MÓDULO: AGENCIAS Y DIRECCIONES
// ==========================================
let currentAgencyZone = "todas";
let displayedAgencyLimit = 30;

function setAgencyZone(zone, btnElement) {
  currentAgencyZone = zone;
  displayedAgencyLimit = 30;
  document.querySelectorAll(".agency-zone-btn").forEach((btn) => {
    btn.classList.remove("bg-rose-600", "text-white");
    btn.classList.add("bg-slate-100", "text-slate-700");
  });
  if (btnElement) {
    btnElement.classList.remove("bg-slate-100", "text-slate-700");
    btnElement.classList.add("bg-rose-600", "text-white");
  }
  filterAgencies();
}

function clearAgencySearch() {
  const input = document.getElementById("agencySearchInput");
  if (input) input.value = "";
  const select = document.getElementById("agencyDistrictSelect");
  if (select) select.value = "";
  const clearBtn = document.getElementById("btnClearSearch");
  if (clearBtn) clearBtn.classList.add("hidden");
  displayedAgencyLimit = 30;
  filterAgencies();
}

function populateDistrictSelect() {
  const select = document.getElementById("agencyDistrictSelect");
  if (!select || !AppState.agencies) return;

  const districtCounts = {};
  AppState.agencies.forEach((a) => {
    if (a.district) {
      districtCounts[a.district] = (districtCounts[a.district] || 0) + 1;
    }
  });

  const sortedDistricts = Object.keys(districtCounts).sort();
  select.innerHTML = `<option value="">Todos los distritos de Lima y Callao (${AppState.agencies.length} sedes)</option>` +
    sortedDistricts.map(d => `<option value="${d}">${d} (${districtCounts[d]} sedes)</option>`).join("");
}

function filterAgencies() {
  const searchInput = document.getElementById("agencySearchInput");
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const select = document.getElementById("agencyDistrictSelect");
  const selectedDistrict = select ? select.value : "";
  const clearBtn = document.getElementById("btnClearSearch");
  if (clearBtn) {
    if (query.length > 0) clearBtn.classList.remove("hidden");
    else clearBtn.classList.add("hidden");
  }

  const filtered = AppState.agencies.filter((a) => {
    if (currentAgencyZone === "hubs" && !a.isHub) return false;
    if (currentAgencyZone !== "todas" && currentAgencyZone !== "hubs" && a.zone !== currentAgencyZone) return false;
    if (selectedDistrict && a.district !== selectedDistrict) return false;

    if (query) {
      const matchName = a.name && a.name.toLowerCase().includes(query);
      const matchAddress = a.address && a.address.toLowerCase().includes(query);
      const matchDistrict = a.district && a.district.toLowerCase().includes(query);
      const matchRef = a.reference && a.reference.toLowerCase().includes(query);
      return matchName || matchAddress || matchDistrict || matchRef;
    }
    return true;
  });

  renderAgencies(filtered);
}

function loadMoreAgencies() {
  displayedAgencyLimit += 35;
  filterAgencies();
}

function copyToClipboard(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalContent = btnElement.innerHTML;
    btnElement.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600"></i> <span class="text-emerald-600 font-bold">¡Copiado!</span>`;
    if (window.lucide) lucide.createIcons();
    setTimeout(() => {
      btnElement.innerHTML = originalContent;
      if (window.lucide) lucide.createIcons();
    }, 2000);
  }).catch(() => {
    prompt("Copia la dirección seleccionando el texto:", text);
  });
}

function renderAgencies(filteredList = null) {
  const list = filteredList !== null ? filteredList : AppState.agencies;
  const container = document.getElementById("agenciesList");
  const badge = document.getElementById("agencyCountBadge");
  const loadMoreBtn = document.getElementById("agenciesLoadMoreContainer");
  if (!container) return;

  if (badge) {
    badge.innerHTML = `<i data-lucide="map-pin" class="w-3.5 h-3.5"></i> ${list.length} Sede${list.length === 1 ? '' : 's'} Activa${list.length === 1 ? '' : 's'}`;
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6 text-slate-500">
        <div class="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3">
          <i data-lucide="map-pin-off" class="w-6 h-6"></i>
        </div>
        <h4 class="font-bold text-slate-800 text-base mb-1">No se encontraron agencias</h4>
        <p class="text-xs text-slate-500 mb-4">No hay resultados para el filtro o término de búsqueda ingresado.</p>
        <button onclick="clearAgencySearch()" class="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition">
          Restablecer Filtros
        </button>
      </div>
    `;
    if (loadMoreBtn) loadMoreBtn.classList.add("hidden");
    if (window.lucide) lucide.createIcons();
    return;
  }

  const itemsToShow = list.slice(0, displayedAgencyLimit);

  container.innerHTML = itemsToShow.map((a) => {
    const lat = a.lat || "";
    const lng = a.lng || "";
    const mapsUrl = lat && lng
      ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.address + ", " + (a.district || "Lima") + ", Peru")}`;
    const wazeUrl = lat && lng
      ? `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`
      : `https://waze.com/ul?q=${encodeURIComponent(a.address)}&navigate=yes`;

    const isHub = a.isHub;
    const badgeColor = isHub 
      ? 'bg-rose-100 text-rose-800 border-rose-200' 
      : (a.province === 'CALLAO' ? 'bg-purple-100 text-purple-800 border-purple-200' : 'bg-slate-100 text-slate-700 border-slate-200');

    const cleanAddressEscaped = (a.address || "").replace(/'/g, "\\'").replace(/"/g, "&quot;");

    return `
      <div class="bg-white border ${isHub ? 'border-rose-300 ring-1 ring-rose-200 shadow-sm' : 'border-slate-200 shadow-xs'} rounded-2xl p-4 sm:p-5 hover:shadow-md transition">
        <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2 mb-1.5">
              <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badgeColor}">
                ${a.category}
              </span>
              <span class="text-[11px] font-semibold text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                📍 ${a.zone} • ${a.district}
              </span>
              ${isHub ? '<span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">⭐ Hub Garita 24/7</span>' : ''}
            </div>

            <h4 class="font-bold text-slate-900 text-base sm:text-lg tracking-tight">${a.name}</h4>

            <!-- Dirección con botón de copiar -->
            <div class="mt-2 flex items-start justify-between gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div class="flex items-start gap-2 text-xs text-slate-800 min-w-0">
                <i data-lucide="map-pin" class="w-4 h-4 text-rose-500 shrink-0 mt-0.5"></i>
                <div class="break-words">
                  <span class="font-semibold text-slate-900">${a.address}</span>
                  ${a.reference ? `<p class="text-[11px] text-slate-500 mt-0.5 italic">Ref: ${a.reference}</p>` : ''}
                </div>
              </div>
              <button onclick="copyToClipboard('${cleanAddressEscaped}', this)" title="Copiar dirección exacta" class="shrink-0 text-[11px] text-slate-600 hover:text-rose-600 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-300 px-2.5 py-1 rounded-lg font-medium transition flex items-center gap-1 shadow-2xs">
                <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copiar
              </button>
            </div>

            <div class="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 bg-white p-1 rounded-xl">
              <div class="flex items-center gap-1.5"><i data-lucide="clock" class="w-3.5 h-3.5 text-slate-400"></i> <span><strong>Horario:</strong> ${a.gateHours}</span></div>
              <div class="flex items-center gap-1.5"><i data-lucide="phone" class="w-3.5 h-3.5 text-slate-400"></i> <span>${a.phone}</span></div>
              <div class="sm:col-span-2 flex items-center gap-1.5 text-slate-500 text-[11px]"><i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-600"></i> <span><strong>Seguridad:</strong> ${a.epp}</span></div>
            </div>
          </div>

          <!-- Botones GPS -->
          <div class="flex flex-row md:flex-col gap-2 shrink-0 justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
            <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 md:flex-none text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3.5 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition shadow-2xs">
              <i data-lucide="map" class="w-4 h-4 text-blue-600"></i> Google Maps
            </a>
            <a href="${wazeUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 md:flex-none text-xs font-bold bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200 px-3.5 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition shadow-2xs">
              <i data-lucide="navigation" class="w-4 h-4 text-cyan-600"></i> Waze
            </a>
          </div>
        </div>
      </div>
    `;
  }).join("");

  if (loadMoreBtn) {
    if (itemsToShow.length < list.length) {
      loadMoreBtn.classList.remove("hidden");
      loadMoreBtn.querySelector("button").innerHTML = `
        <i data-lucide="chevron-down" class="w-4 h-4"></i> Mostrar más (${list.length - itemsToShow.length} agencias restantes)
      `;
    } else {
      loadMoreBtn.classList.add("hidden");
    }
  }

  if (window.lucide) lucide.createIcons();
}

// ==========================================
// 9. MÓDULO: EVALUACIÓN POST-RUTA
// ==========================================
function calculateKmDiff() {
  const start = parseFloat(document.getElementById("evalKmStart").value) || 0;
  const end = parseFloat(document.getElementById("evalKmEnd").value) || 0;
  const total = end >= start && start > 0 ? (end - start).toFixed(1) : "0";
  document.getElementById("evalKmTotal").value = `${total} KM`;
}

function calculateDeliveryRatio() {
  const sched = parseInt(document.getElementById("evalOrdersScheduled").value) || 0;
  const comp = parseInt(document.getElementById("evalOrdersCompleted").value) || 0;
  const ret = parseInt(document.getElementById("evalOrdersReturned").value) || 0;

  if (sched > 0) {
    const pct = ((comp / sched) * 100).toFixed(1);
    const pctEl = document.getElementById("evalEfficiencyPercent");
    pctEl.value = `${pct}%`;
    if (pct >= 90) {
      pctEl.className = "w-full p-2.5 border border-slate-200 bg-emerald-50 text-emerald-700 font-bold rounded-xl text-sm";
    } else if (pct >= 75) {
      pctEl.className = "w-full p-2.5 border border-slate-200 bg-amber-50 text-amber-700 font-bold rounded-xl text-sm";
    } else {
      pctEl.className = "w-full p-2.5 border border-slate-200 bg-rose-50 text-rose-700 font-bold rounded-xl text-sm";
    }
  }
}

function savePostRouteEvaluation(e) {
  e.preventDefault();

  const driver = document.getElementById("evalDriverName").value;
  const plate = document.getElementById("evalTruckPlate").value.toUpperCase();
  const cd = document.getElementById("evalReturnCd").value;
  const kmStart = document.getElementById("evalKmStart").value || "N/A";
  const kmEnd = document.getElementById("evalKmEnd").value;
  const kmTotal = document.getElementById("evalKmTotal").value;
  const fuel = document.querySelector('input[name="fuelLevel"]:checked')?.value || "No indicado";
  const scheduled = document.getElementById("evalOrdersScheduled").value;
  const completed = document.getElementById("evalOrdersCompleted").value;
  const returned = document.getElementById("evalOrdersReturned").value;
  const efficiency = document.getElementById("evalEfficiencyPercent").value;
  const incidents = document.getElementById("evalIncidents").value.trim() || "Sin novedades mecánicas ni demoras";

  const checklist = {
    lights: document.getElementById("checkLights").checked,
    tires: document.getElementById("checkTires").checked,
    clean: document.getElementById("checkClean").checked,
    tools: document.getElementById("checkTools").checked
  };

  const evalRecord = {
    id: Date.now(),
    date: new Date().toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    driver,
    plate,
    cd,
    kmStart,
    kmEnd,
    kmTotal,
    fuel,
    scheduled,
    completed,
    returned,
    efficiency,
    checklist,
    incidents
  };

  AppState.evaluations.unshift(evalRecord);
  localStorage.setItem("antigravity_choferes_evals", JSON.stringify(AppState.evaluations));

  renderEvaluationHistory();
  alert(`Evaluación de retorno registrada con éxito para la unidad ${plate}. ¡Buen trabajo!`);
  clearEvalSignature();
}

function loadSavedEvaluations() {
  try {
    const raw = localStorage.getItem("antigravity_choferes_evals");
    if (raw) {
      AppState.evaluations = JSON.parse(raw);
    } else {
      // Registro de ejemplo
      AppState.evaluations = [
        {
          id: 1,
          date: "Hoy 17:15",
          driver: "Diego Lizarbe",
          plate: "B7A-892",
          cd: "CD Mosquera (Taller)",
          kmTotal: "115.0 KM",
          fuel: "3/4 Tanque",
          completed: "17",
          scheduled: "18",
          efficiency: "94.4%",
          incidents: "Todo conforme en ruta este. Se entregó hoja física en garita Mosquera."
        }
      ];
    }
  } catch (err) {
    AppState.evaluations = [];
  }
}

function renderEvaluationHistory() {
  const container = document.getElementById("evalHistoryContainer");
  if (!container) return;

  if (AppState.evaluations.length === 0) {
    container.innerHTML = `
      <div class="text-xs text-slate-400 p-4 text-center bg-white rounded-xl border border-slate-200">
        No hay evaluaciones registradas recientemente.
      </div>
    `;
    return;
  }

  container.innerHTML = AppState.evaluations.map((ev) => `
    <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-xs space-y-1.5">
      <div class="flex justify-between items-center font-bold text-slate-800">
        <span>🚛 Unidad: ${ev.plate} • ${ev.cd}</span>
        <span class="text-slate-500 font-normal">${ev.date}</span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-600 pt-1">
        <div><strong>Conductor:</strong> ${ev.driver}</div>
        <div><strong>Recorrido:</strong> ${ev.kmTotal}</div>
        <div><strong>Combustible:</strong> ${ev.fuel}</div>
        <div><strong>Entregas:</strong> ${ev.completed}/${ev.scheduled} (${ev.efficiency})</div>
      </div>
      <div class="text-slate-500 italic pt-1 border-t border-slate-100">
        "${ev.incidents}"
      </div>
    </div>
  `).join("");
}

function shareEvalByWhatsApp() {
  const driver = document.getElementById("evalDriverName").value || AppState.activeDriver.name;
  const plate = document.getElementById("evalTruckPlate").value || "B7A-892";
  const cd = document.getElementById("evalReturnCd").value;
  const kmTotal = document.getElementById("evalKmTotal").value;
  const fuel = document.querySelector('input[name="fuelLevel"]:checked')?.value || "1/2 Tanque";
  const comp = document.getElementById("evalOrdersCompleted").value;
  const sched = document.getElementById("evalOrdersScheduled").value;
  const eff = document.getElementById("evalEfficiencyPercent").value;
  const incidents = document.getElementById("evalIncidents").value || "Sin observaciones";

  const message = `*REPORTE DE EVALUACIÓN POST-RUTA* 📋
👤 *Conductor:* ${driver}
🚛 *Placa de Unidad:* ${plate}
🏢 *Retorno a:* ${cd}
🛣️ *KM Recorrido:* ${kmTotal}
⛽ *Nivel Combustible:* ${fuel}
📦 *Cumplimiento:* ${comp} de ${sched} entregas (${eff})
🔧 *Checklist Vehicular:* Conforme
📝 *Novedades:* ${incidents}

_Enviado desde el Portal de Capacitación para Chóferes - CD Huachipa_`;

  const waUrl = `https://wa.me/51987654321?text=${encodeURIComponent(message)}`;
  window.open(waUrl, "_blank");
}

