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
