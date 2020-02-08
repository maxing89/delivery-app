Datos personales:

Nombre y apellido: Maximiliano Navas Gago
DNI: 34870777
Edad: 28 años
Carreras: Analista Programador Universitario [recibido] (UNLP), Licenciatura en Sistemas [tesis en curso] (UNLP)
Trabajo actual: Celerative SRL
Puesto: Full Stack Developer

Conocimiento de AngularJS y Angular. Investigación previa. Impresiones de las tecnologías:

Trabajé casi 1 año y medio con AngularJS como tecnología frontend en el Gobierno de la Ciudad de Bs As, en
el departamento de Censos y Estadísticas. Desarrollamos 2 proyectos con dicho lenguaje.
Me introduje a Angular 4 hace un año para realizar un proyecto que duró exactamente 1 año para una Fintech
Estadounidense, fue 100% remoto y teníamos un contacto diario con la gente de backend (.Net), los Business
Analysts, el Product Manager y Diseñadores.
Cuando decidimos aplicar este lenguaje para el proyecto pesó mucho que tenga componentes, ya que para el
trabajo en equipo (éramos 4), era sumamente aprovechable. Cada uno podía trabajar en sus componentes sin
pisarle trabajo al otro. Y la comunicación entre los componentes la dimos con un Store general, usando ngrx/Store, el cual usa el paradigma de Redux para Angular.
Al código lo modularizamos aún más usando ngrx/effects, esta librería permite manejar efectos secondarios
ante la ejecución de una Action determinada. Liberando de lógica, dejando más legibles y "limpios" los componentes.
Para ir corroborando y siguiendo los valores que están en el Store se utiliza la herramienta ngrx/Devtools, la cual brinda una pestaña en el navegador con una interfaz muy amigable.
Para la creación del projecto usamos el command line interface Angular CLI, seteando los styles para SASS.
Además instalamos las librerías ngx-bootstrap para usar componentes de Bootstrap en Angular 2+, y bootstrap-sass.
Como Package Manager está Yarn.
Para seguir un estándar de buenas prácticas en el código usamos el linter de Typescript para el IDE Atom.
Algo que implementamos mucho que nos brinda Angular fueron los Reactive Forms, es una técnica desarrollada por Angular para crear formularios de forma reactiva. Siguiendo esta línea toda la programación del proyecto fue llevada a cabo de manera reactiva, es por eso que tanto los métodos como campos instanciados reaccionan automáticamente y rehacen todas las evaluaciones cuando uno de los objetos está sujeto a un observable. Es de esta manera que el Store siempre se actualiza al tener sus variables subscriptas a observables.
Una buena práctica que me han enseñado a lo largo del proyecto mencionado y he implementado desde ese momento, es no usar librerías a mansalva, sino desarrollar código propio para ajustarlo a lo que necesitemos y sea más fácil de modificar en el futuro. Es por este motivo que notarán que tanto la paginación, los filtros, los ordenamientos, etc fueron implementados sin usar librerías. Sino que se hicieron aprovechando el poder de Angular. 
Todo esto mencionado anteriormente lo apliqué para este proyecto de Deliveries Online.

Notas Generales:

Lo primero que me gustaría aclarar es que al no tener una API que respalde el desarrollo frontend de este proyecto, mucha lógica de negocio fue implementada por ejemplo en Reducers a través de código Typescript, dicha lógica en realidad debería ser implementada dentro de la API. En este caso intenté simular lo más cercano al flujo que podría tener un proyecto real. Con lo cual mucho de este código en realidad no iría y se vería algo más legible en algunos fragmentos de los componentes.
A mejorar después de hacer un poco de QA:
  - Dentro del formulario de Delivery al tabular en Contacto Administrativo y Contacto Comercial no sigue el flujo que se podría esperar. Si no que pasa de Administrativos a Comerciales.
  - Sacar lógica de negocio de los Reducers (si hubiera API)
  - Aplicar máscaras de sólo texto y para el teléfono a los inputs
  - Guardar el estado del checkbox dentro del formulario
  - Al estar el checkbox "Ídem Contacto administrativo" en true, poner los datos automáticamente en los inputs de Contacto comercial.
  - Predefinir rutas muy usadas para no tener que buscarlas en cada uno de los componentes.

Instrucciones para ejecutar el proyecto:
- Descomprimir Delivery.zip
- Abrir consola de comandos
- Posicionarse en la carpeta Delivery
- Ejecutar la instrucción yarn (para instalar las dependencias usadas en el proyecto)
- Ejecutar la instrucción ng serve (para compilar y correr el proyecto)
- En el navegador ingresar a http://localhost:**** (Con el puerto que se indique en la consola, en mi caso es 4200)

Muchas gracias.
