<!--

En los ejemplos siguientes intentamos poner enfoque en procesos que hablan más
a la audiencia, experiencias locales, iniciativas actuales, etc.

-->

# Gestión de pedidos de la cooperativa de consumo Estèvia

Durante sus primeros años de funcionamiento, la cooperativa de consumo Estèvia
[^estevia] gestionó los pedidos de las unidades familiares (UF) a través de
unos documentos Excel guardados en una carpeta de Dropbox. Pero como muchas UF
hacían sus pedidos al mismo tiempo (viernes por la noche y sábado), se creaban
copias conflictivas en Dropbox y era frecuente que los pedidos de algunas UF
desaparecieran.

El resto de la contabilidad se gestionaba a través de unos documentos Excel
caseros y, a pesar de problemas de liquidad recurrentes, nadie guardaba un ojo
sobre la salud a largo plazo de la economía de la cooperativa. Después de 4
años de funcionamiento, un balance contable descubrió, después de un complicado
análisis de los datos contables esparcidos en los varios documentos, que la
cooperativa había generado un déficit de más de 3000€.

Decidieron instalar el programa L'Aixada [^aixada] en un servidor
autogestionado [^pimienta] para gestionar los pedidos en linea de manera más
fácil. El programa Aixada es un software libre que fue creado inicialmente a
medida para la cooperativa de Gràcia del mismo nombre [^gracia] y luego
reutilizado por otras cooperativas catalanas. Es muy completo y relativamente
fácil de usar por las UFs. Pero no tiene documentación y es muy marcado por el
funcionamiento interno de la cooperativa de Gràcia que lo creó. Una persona de
Estèvia dedicó un tiempo considerable en volverse experta en la administración
relativamente complicada de la herramienta y propuso usar las funcionalidades
principales para gestionar los pedidos.

Todas las UFs aprendieron con éxito a usar L'Aixada para pasar sus pedidos. Las
UFs de la comisión facturación aprendieron con más dificultad a usar algunas
funcionalidades más avanzadas de contabilidad que, al fin y a cabo, facilitaron
su trabajo para un mejor control de las entradas de dinero.

La asamblea tomó también decisiones para reducir radicalmente los gastos de
funcionamiento. Después de 12 meses, el déficit inicial estaba compensado
aunque la cooperativa sigue sin una manera fácil de verificar con regularidad
su salud económica. Probablemente, la totalidad de la gestión contable de la
cooperativa se podría gestionar a través de L'Aixada pero esto requeriría más
trabajo complejo de análisis y aprendizaje de la herramienta. También podría
implicar modificar el código del programa para adaptarse mejor al
funcionamiento propio de Estèvia y la cooperativa no tendría la capacidad
técnica para hacer este trabajo.

[^estevia]:  https://esteviapoblenou.wordpress.com/
[^aixada]:   https://github.com/jmueller17/Aixada
[^pimienta]: https://estevia.pimienta.org/
[^gracia]:   https://aixada.org/

\clearpage

# Creación de nodos en el mapa de la red guifi·net

guifi·net [^guifi] es un proyecto tecnológico, social y económico impulsado por
la ciudadanía y que tiene como objetivo la creación de una red de
telecomunicaciones abierta, libre y neutral basada en un modelo de comunes. El
desarrollo de esta infraestructura mancomunada facilita el acceso a las
telecomunicaciones en general y a la conexión a Internet de banda ancha en
particular.

En abril 2017, la red estaba compuesta de más de 30'000 nodos, unas
infraestructuras gestionadas tanto por empresas, instituciones y particulares:
antenas de Wi-Fi, terminales de fibra óptica, ruters, etc.

Cuando un particular quiere añadir un nodo a la red, por ejemplo una antena
Wi-Fi para conectar su segunda residencia a la red y así poder tener acceso a
Internet cuando está de vacaciones, tiene que registrar primero su nodo en el
mapa de la red que está en la web de guifi·net [^mapa]. Al registrar el nodo,
la web le atribuye automáticamente una dirección IP dentro de guifi·net y le
permite también descargar un archivo para configurar automáticamente su antena.
Además, la web de guifi·net tiene mecanismos para detectar el buen
funcionamiento de los nodos y actualizar en tiempo real el estado de la red en
el mapa.

Este mapa abierto y colaborativo es sin duda una de las grandes fuerzas que
permitió a la red tener tanto éxito. Basta con crearse un usuario, registrar su
nodo y montar su antena para hacer parte de la red.

Sin embargo, el proceso requiere conocimientos técnicos altos, no está bien
documentado en la web de guifi·net y podría ser mucho más sencillo de lo que
es. En consecuencia, muchas comunidades han editado sus propias guias para
montar nodos [^castello] y, en la práctica, es a veces más fácil encontrar
alguien que te explique como hacerlo que entenderlo por tu misma.

Pero para los usuarios avanzados, que quizás son la mayor parte de los
administradores de nodos, la web y su mapa son unas herramientas
imprescindibles para entender y administrar la red de manera colaborativa,
tienen funcionalidades muy potentes y ofrece mucha flexibilidad.

[^guifi]:    https://guifi.net/
[^mapa]:     https://guifi.net/en/node/2413/view/map
[^castello]: http://castello.guifi.net/sites/default/files/InstalarNodoCliente_1.pdf

\clearpage

# Priorización de la lista de espera de la cooperativa de vivienda Abril

Abril es un proyecto de cooperativa de vivienda para 21 familias en
Poblenou con un fuerte carácter social y de barrio. En los primeros
tiempos de la construcción del proyecto más de 21 familias manifestaron
su interés en la cooperativa. Los socios crearon una lista de espera con
el objetivo de poder remplazar las familias que dejarían el proyecto
mientras se iba solidificando el grupo y definiendo mejor el proyecto.

Pronto la lista llegó a tener 25 familias adicionales que incluían gente
conocida del barrio, amigos, familiares, gente desconocida, etc. y era
necesario tener un orden para todas: saber que familia llamarían primero
en caso de baja de una familia del proyecto. Los socios debatieron sobre
los criterios a usar para ordenar la lista (implicación en el barrio,
condición económica, diversidad de perfil social, habilidades útiles
para el proyecto, experiencia cooperativa, afinidad personal, etc.).
Llegar a un acuerdo sobre como aplicar estos criterios equitativamente y
colectivamente prometía ser muy complicado y requerir debates
interminables cuando lo que necesitaban más en este momento era
centrarse en definir mejor el proyecto de cooperativa en sí y reforzar
el grupo ya existente.

Finalmente se pusieron de acuerdo en asamblea sobre usar un método de
voto Condorcet [^condorcet] para combinar las preferencias de todas los
socios. El método de voto Condorcet permite a cada votante ordenar la
lista de todos los candidatos por su orden de preferencia personal. Hay
un candidato ganador del voto si este candidato es preferido por cada
votante a todos los otros candidatos. Si no hay un simple candidato
ganador, existen métodos complementarios de resolución, como el método
Schulze [^schulze], que permite crear una lista ordenada de todos los
candidatos.

Utilizaron una página web para hacer votaciones Condorcet gratis y libre
alojada por el departamento de informática de una universidad americana.
Las 21 familias consiguieron votar. Algunas se confundieron en como
votar pero el administrador del voto pudo detectar y corregir estos
errores. Como era la primera vez que usaban esta herramienta también
tuvieron algunos problemas al configurar el voto e interpretar los
resultados. Pero una vez estos pequeños problemas superados los
resultados finales dieron satisfacción al grupo entero.

[^condorcet]: https://es.wikipedia.org/wiki/M%C3%A9todo_de_Condorcet
[^schulze]:   https://es.wikipedia.org/wiki/M%C3%A9todo_Schulze
[^civs]:      http://civs.cs.cornell.edu/

\clearpage

# Recompilación automática de convocatorias y noticias para el 15M Barcelona

Los meses y años después del 15M fueron marcados por una efervescencia en los
movimientos sociales, tanto por sectores (en partes siguiendo el trabajo de las
comisiones de la Plaça Catalunya) como por zonas geográficas (barrios y vilas
que mantuvieron asambleas).

L'Espai de Coordinació se propuso como espacio de intercambio y coordinación
entre estas diferentes iniciativas una vez desaparecido el espacio físico de la
Plaça Catalunya. El Grup Tècnic de l'Espai de Coordinació publicó hasta junio
2015, un boletín semanal de información agrupando las convocatorias y noticias
relacionadas con estos movimientos.

Muchos de los grupos o barrios que seguían movilizados tenían sus propios blogs
o listas de correo par difundir sus actividades y una persona de l'Espai de
Coordinació recopilaba manualmente toda esta información cada semana. Pero al
pasar los años, sintieron la necesidad de automatizar esta tarea.

Un miembro del l'Espai de Coordinació que sabía programar
escribió un programa [^social-digest] para agregar automáticamente todas estas
fuentes de información, publicarlas en la web de l'Espai de Coordinació
[^noticies], en la web de l'Acampada BCN y enviar un email a una serie de
contactos.

El programa se dejó de utilizar cuando se dejó de publicar este boletín en
2015. Aunque el código del programa estuviera publicado, no parece haber sido
reutilizado en otro contexto.

[^social-digest]: https://github.com/pepe84/social-digest
[^noticies]:      https://web-beta.archive.org/web/20130609015254/http://espaicoordinacio.net:80/noticies-2/
