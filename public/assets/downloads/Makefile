OPTIONS = --variable=geometry:a4paper \
          --variable geometry:margin=3cm

all: Herramientas.pdf Ejemplos_de_procesos.pdf Principios_tecnopoliticos.pdf

Herramientas.pdf: Herramientas.md
	pandoc -o Herramientas.pdf ${OPTIONS} Herramientas.md

Ejemplos_de_procesos.pdf: Ejemplos_de_procesos.md
	pandoc -o Ejemplos_de_procesos.pdf ${OPTIONS} Ejemplos_de_procesos.md

Principios_tecnopoliticos.pdf: Principios_tecnopoliticos.md
	pandoc -o Principios_tecnopoliticos.pdf ${OPTIONS} Principios_tecnopoliticos.md
