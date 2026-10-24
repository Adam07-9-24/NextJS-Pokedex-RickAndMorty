# Laboratorio 10 con Next.js

Proyecto académico que reúne una Pokédex y un directorio de personajes de Rick and Morty para demostrar App Router, SSG, SSR, CSR e ISR con Next.js 16.

## Aplicaciones

- /pokemon: listado de los primeros 151 Pokémon.
- /pokemon/[name]: detalle estático de cada Pokémon.
- /rick-and-morty: estadísticas almacenadas, búsqueda cliente y listado paginado renderizado en servidor.
- /rick-and-morty/[id]: detalle estático de cada personaje disponible en la API.

## Tecnologías

- Next.js 16.4.3 con App Router y Cache Components.
- React 19 y TypeScript estricto.
- Tailwind CSS 4.
- React Icons.
- PokeAPI.
- The Rick and Morty API.

## Renderizado y caché

La Pokédex conserva una revalidación de 24 horas. Rick and Morty usa un perfil de caché de 10 días mediante "use cache" y cacheLife, con expiración posterior a la revalidación.

En /rick-and-morty:

- Las estadísticas generales se almacenan y se incluyen en la salida estática.
- El listado paginado utiliza una consulta sin caché dentro de Suspense para renderizarse en el servidor.
- La búsqueda es un Client Component con useState, useEffect, debounce de 300 ms y AbortController.
- Los detalles se generan estáticamente para todos los IDs devueltos por la API.

## Desarrollo

Ejecutar npm run dev y abrir http://localhost:3000.

## Verificaciones

- npm run lint
- node_modules\.bin\tsc.cmd --noEmit
- npm run build
- npm start

## Despliegue posterior

El proyecto no requiere variables de entorno ni secretos. Está preparado para importarse posteriormente en Vercel mediante un repositorio Git, pero este repositorio no se publica ni despliega automáticamente.
