
  # Project setup

  This is a code bundle for Project setup. The original project is available at https://www.figma.com/design/nqbXTEjK5xKpAEnRKHDW5u/Project-setup.

  ## Running the code

This workspace combines a Django backend with a React + Vite frontend in a monolithic architecture. During development the two layers run separately; in production Django serves the React build via staticfiles.

### Frontend

1. `cd frontend`
2. `npm install` (or yarn/pnpm)
3. `npm run dev` to start the Vite development server.
4. `npm run build` when you want to produce a production bundle; the `postbuild` script moves the `index.html` into the Django templates directory so that `collectstatic` will pick it up.
5. Generate TypeScript types from the API schema with `npm run gen:types` (requires the Django server running at `localhost:8000`).

### Backend

1. Create a Python virtual environment and install required packages (`Django`, `djangorestframework`, `drf-spectacular`, `django-cors-headers`, `djangorestframework-simplejwt`, `django-filter`, etc.).
2. Configure `.env` with database and CORS settings; `backend/.env.example` contains a template.
3. Apply migrations: `python manage.py migrate`.
4. Run the development server: `python manage.py runserver`.
5. API endpoints are versioned under `/api/v1/`; schema and Swagger UI are available at `/api/schema/` and `/api/schema/swagger/`.
6. Authentication uses JWT. Obtain a token pair via POST to `/api/v1/auth/token/` and include the access token in the `Authorization: Bearer ...` header.

### Monolithic build

- After running the frontend `npm run build`, run `python manage.py collectstatic` to gather assets into `staticfiles/`.
- Django (with WhiteNoise) will serve the static JS/CSS and `index.html`.

### Testing

- Backend tests are written with Django's `TestCase` / pytest. Run with `python manage.py test` or `pytest` once dependencies are installed.
- Frontend tests use React Testing Library; install `@testing-library/react` and add scripts as needed.
- End-to-end scenarios can be automated with Cypress against the running `localhost` server.
  