# 🎬 Galería de Películas y Series

Aplicación web construida con Next.js 16 que consume la API de OMDb para mostrar películas y series con una experiencia visual profesional.

## 🚀 Características

- **Hero Carousel**: Carrusel automático con películas destacadas (Avengers, Iron Man, Guardians of the Galaxy, etc.)
- **Películas Populares**: Grid de películas populares con efecto hover
- **Búsqueda en Tiempo Real**: Búsqueda interactiva con debounce sin recargar la página
- **Modal de Detalles**: Información completa de cada película/serie (rating, géneros, sinopsis, actores, premios, etc.)
- **Diseño Responsivo**: Adaptable a todos los dispositivos
- **SSR + CSR**: Renderizado híbrido para mejor SEO y experiencia de usuario

## 🛠️ Tecnologías

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **API**: OMDb API
- **Despliegue**: Vercel

## 📁 Estructura

```
app/
├── movies/
│   ├── components/
│   │   ├── HeroCarousel.tsx    # Carrusel de películas destacadas (CSR)
│   │   ├── MovieCard.tsx       # Tarjeta de película (CSR)
│   │   ├── MovieModal.tsx      # Modal de detalles (CSR)
│   │   ├── MovieSearch.tsx     # Búsqueda interactiva (CSR)
│   │   └── PopularMovies.tsx  # Grid de películas populares (CSR)
│   ├── page.tsx                # Página principal (SSR)
│   └── types.ts                # Tipos de TypeScript
├── layout.tsx
└── page.tsx                    # Redirección a /movies
```

## 🔑 Variables de Entorno

Crea un archivo `.env.local` con:

```env
NEXT_PUBLIC_OMDB_API_KEY=tu_api_key
```

Obtén tu API key gratuita en: https://www.omdbapi.com/apikey.aspx

## ▶️ Ejecución Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar en producción
npm start
```

Abre http://localhost:3000/movies

## 📊 Justificación SSR vs CSR

| Componente | Tipo | Razón |
|------------|------|-------|
| `page.tsx` | SSR | SEO, LCP, contenido visible inmediatamente |
| `HeroCarousel` | CSR | Interactividad, cambio de slides |
| `PopularMovies` | CSR | Click en cards abre modal dinámicamente |
| `MovieSearch` | CSR | Búsqueda en tiempo real sin reload |
| `MovieModal` | CSR | Carga detalles bajo demanda |

## 🌐 Despliegue en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Importa el repositorio
3. Agrega la variable de entorno `OMDB_API_KEY`
4. Deploy automático

## 📄 Licencia

MIT