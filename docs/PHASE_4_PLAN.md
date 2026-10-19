# Fase 4 — Estabilización, validación y optimización

## Propósito

La Fase 4 consolida la base técnica del portfolio GusDev después de la publicación de la Fase 3. Su objetivo es estabilizar las herramientas de validación, revisar la deuda de seguridad, completar las comprobaciones visuales y de accesibilidad, alinear la presentación para buscadores y medir el rendimiento antes de una nueva publicación.

Este documento es la planificación propia de GusDev. El archivo local `implementation_plan.md` pertenece a Visualtask APP, no forma parte de esta fase y no debe modificarse ni versionarse.

## Alcance

La fase se divide en cinco entregas consecutivas. Cada entrega debe permanecer local hasta su revisión y aprobación. No se cambia el diseño aprobado, la configuración de correo ni la infraestructura de Vercel salvo autorización expresa.

Quedan fuera del alcance obligatorio una Content Security Policy, CI/E2E permanente y rate limiting distribuido. Pueden evaluarse después de cerrar la fase.

## Entregas

### 4.1 — Estabilización técnica

**Objetivos**

- Diagnosticar el error `uv_os_get_passwd returned ENOMEM` que bloquea `npm test` en el entorno automatizado.
- Recuperar la ejecución normal cuando exista una corrección segura dentro del proyecto o documentar de forma concluyente una limitación exclusiva del entorno.
- Auditar las dependencias y aplicar únicamente actualizaciones compatibles y justificadas.

**Dependencias**

- Parte de la rama `master` publicada al cierre de la Fase 3.
- Condiciona todas las validaciones de las entregas posteriores.

**Riesgos**

- Confundir un bloqueo de API del sandbox con falta real de memoria.
- Forzar una degradación de `eslint-config-next` incompatible con Next.js 16.
- Introducir overrides transitivos sin respaldo en los rangos declarados.

**Criterios de aceptación**

- La causa del fallo del runner está reproducida y documentada.
- `npm test` ejecuta las 59 pruebas sin workaround en un entorno Windows normal; si el sandbox impide la consulta del usuario del sistema, la limitación queda aislada y no se incorpora un monkeypatch al repositorio.
- ESLint, TypeScript y el build de producción finalizan correctamente.
- Las actualizaciones mantienen Next.js 16 y no alteran el runtime del portfolio.
- Las alertas residuales quedan justificadas con su cadena, alcance y condición de corrección.

### 4.2 — Validación visual, accesibilidad y privacidad

**Objetivos**

- Validar los anchos de 320, 390, 768, 1024 y 1440 px.
- Comprobar teclado, foco, diálogo móvil, movimiento reducido, cambio de tema, expansiones y formulario con respuestas simuladas.
- Revisar la procedencia, autorización y anonimización de `public/images/fundacion_maldonado_preview.png`.

**Dependencias**

- Entrega 4.1 aprobada y runner estable.
- Acceso a un navegador real y, para la captura médica, decisión del responsable del material.

**Riesgos**

- Diferencias de geometría que las pruebas estructurales no pueden detectar.
- Exposición de datos incrustados en píxeles si la captura no estuviera anonimizada.

**Criterios de aceptación**

- Matriz responsive y de interacción completada sin regresiones de la Fase 3.
- Recorrido de teclado, foco y lector de pantalla documentado.
- Consola sin errores evidentes de hidratación.
- La captura médica cuenta con autorización y anonimización confirmadas o queda retirada de una futura publicación.

### 4.3 — SEO y posicionamiento profesional

**Objetivos**

- Centralizar metadata, Open Graph, Twitter y JSON-LD.
- Alinear título, descripción y datos estructurados con el posicionamiento profesional aprobado en la Fase 3.

**Dependencias**

- Contenido profesional de la Fase 3 aprobado.
- Entrega 4.2 cerrada para no mezclar cambios visuales con metadata.

**Riesgos**

- Mantener fuentes duplicadas de contenido o alterar previews sociales sin comprobarlas.

**Criterios de aceptación**

- Una fuente coherente para el contenido compartido de metadata.
- HTML generado, Open Graph, Twitter y JSON-LD consistentes con el hero y la biografía.
- Canonical, robots y sitemap conservados y verificados.

### 4.4 — Rendimiento

**Objetivos**

- Obtener una línea base reproducible de rendimiento.
- Optimizar recursos gráficos pesados sin deformar, recortar información o degradar la identidad visual.

**Dependencias**

- Entregas funcionales y editoriales anteriores estables.
- Revisión visual de cada recurso modificado.

**Riesgos**

- Reducir legibilidad en capturas de aplicaciones o alterar transparencias y color.

**Criterios de aceptación**

- Métricas antes y después documentadas.
- Peso transferido reducido donde exista una mejora comprobable.
- Sin saltos de layout, deformaciones ni pérdida de contenido relevante.

### 4.5 — Validación final y publicación

**Objetivos**

- Ejecutar la validación integral de la fase.
- Revisar el diff, organizar commits por responsabilidad y preparar la publicación.
- Publicar y verificar producción únicamente después de autorización explícita.

**Dependencias**

- Entregas 4.1 a 4.4 aprobadas.
- Rama remota sin divergencias antes del push.

**Riesgos**

- Mezclar áreas funcionales en commits difíciles de revisar o activar un despliegue automático con una validación incompleta.

**Criterios de aceptación**

- ESLint, TypeScript, pruebas, build, auditoría y `git diff --check` revisados.
- Sin secretos, archivos internos, `.vscode`, artefactos ni cambios ajenos.
- Commits pequeños y coherentes sobre `master`.
- Producción verificada después del push autorizado, sin despliegue manual adicional.

## Criterios de aceptación de la fase completa

- Las cinco entregas fueron revisadas y aprobadas en orden.
- Las 59 pruebas existentes permanecen intactas o el total aumenta mediante casos relevantes.
- No existen regresiones funcionales, visuales ni de accesibilidad respecto de la Fase 3.
- Las alertas pendientes tienen una justificación vigente y no afectan el runtime público.
- La presentación para buscadores coincide con el perfil profesional visible.
- Las mejoras de rendimiento están respaldadas por mediciones.
- Los cambios se publican únicamente con autorización y el repositorio queda limpio.

## Registro de la entrega 4.1

### Diagnóstico del runner

- Entorno auditado: Windows, Node.js 22.19.0, npm 10.2.5 y `tsx` 4.23.13.
- `npm test` falla antes del descubrimiento de pruebas cuando `tsx` crea su directorio temporal.
- Una llamada aislada a `node -e "require('node:os').userInfo()"` produce el mismo `ERR_SYSTEM_ERROR` con `uv_os_get_passwd` y `ENOMEM`.
- El sistema informaba cerca de 19 GB de memoria libre durante la reproducción; el código no es evidencia de agotamiento físico.
- `os.homedir()`, `os.tmpdir()`, hostname y consultas de memoria funcionan. La falla queda limitada a la consulta del usuario efectivo.
- En Windows, `tsx` usa `os.userInfo().username` para construir `tsx-{usuario}`. La versión más reciente disponible conserva esa llamada, por lo que una actualización de parche no corrige este entorno.
- El proceso restringido se ejecuta bajo la identidad `CodexSandboxOffline`; la evidencia es consistente con una restricción del sandbox sobre la API de usuario de Windows.
- El mismo `npm test`, ejecutado sin preload ni cambios fuera del sandbox restringido, completó las 59 pruebas. Esto confirma que el runner y el proyecto funcionan normalmente y que la falla está aislada al entorno automatizado.

No se agregó un preload, monkeypatch, captura silenciosa ni runner alternativo. La suite fue validada con 59 pruebas aprobadas mediante el comando normal `npm test` fuera del sandbox restringido.

### Dependencias

- ESLint se actualizó dentro de la rama 9, de 9.39.2 a 9.39.5.
- Se actualizaron parches transitivos admitidos por los rangos existentes: `@humanfs/node` 0.16.8, `ajv` 6.15.0, `brace-expansion` 1.1.21 y 5.0.12, `flatted` 3.4.4, `js-yaml` 4.3.2, `minimatch` 3.1.5 y `picomatch` 4.0.7.
- La auditoría pasó de 12 alertas a 5 alertas altas, todas derivadas de `braces` a través de la cadena de ESLint de Next.js.
- `braces` no tiene una versión corregida publicada. `npm audit` propone degradar `eslint-config-next` a 14.2.35; se rechaza porque es incompatible con Next.js 16.
- El riesgo residual está limitado al tooling de lint/desarrollo y requiere que patrones glob no confiables alcancen esa cadena. No se incluye en el bundle ni en el endpoint público de contacto.
