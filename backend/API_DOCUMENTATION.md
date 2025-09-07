# Comprehensive LMS Backend API Documentation

## Overview
This document provides complete API documentation for the comprehensive LMS backend system. The backend has been designed to seamlessly synchronize with the React frontend and provides robust content management capabilities.

## Base URL
```
http://localhost:8000/api/v1/
```

## Authentication
The API uses JWT (JSON Web Token) authentication for protected endpoints.

### Authentication Endpoints
- `POST /api/token/` - Obtain JWT token pair
- `POST /api/token/refresh/` - Refresh access token
- `POST /api/token/verify/` - Verify token validity

## Content Management APIs

### Blog System (`/api/v1/blog/`)

#### Endpoints
- `GET /api/v1/blog/` - List published blog posts
- `GET /api/v1/blog/{id}/` - Get specific blog post
- `GET /api/v1/blog/featured/` - Get featured blog posts
- `GET /api/v1/blog/recent/` - Get recent blog posts
- `GET /api/v1/blog/by_category/{category_slug}/` - Get posts by category
- `POST /api/v1/blog/` - Create blog post (admin only)
- `PUT /api/v1/blog/{id}/` - Update blog post (admin only)
- `DELETE /api/v1/blog/{id}/` - Delete blog post (admin only)

#### Blog Categories
- `GET /api/v1/blog/categories/` - List all categories
- `POST /api/v1/blog/categories/` - Create category (admin only)

#### Blog Tags
- `GET /api/v1/blog/tags/` - List all tags
- `POST /api/v1/blog/tags/` - Create tag (admin only)

### Project Portfolio (`/api/v1/projects/`)

#### Endpoints
- `GET /api/v1/projects/` - List published projects
- `GET /api/v1/projects/{id}/` - Get specific project
- `GET /api/v1/projects/featured/` - Get featured projects
- `GET /api/v1/projects/recent/` - Get recent projects
- `GET /api/v1/projects/by_type/{type}/` - Get projects by type
- `POST /api/v1/projects/` - Create project (admin only)
- `PUT /api/v1/projects/{id}/` - Update project (admin only)

#### Technologies
- `GET /api/v1/projects/technologies/` - List all technologies
- `POST /api/v1/projects/technologies/` - Create technology (admin only)

### News System (`/api/v1/news/`)

#### Endpoints
- `GET /api/v1/news/` - List published news items
- `GET /api/v1/news/{id}/` - Get specific news item
- `GET /api/v1/news/urgent/` - Get urgent news
- `GET /api/v1/news/featured/` - Get featured news
- `POST /api/v1/news/` - Create news item (admin only)

#### News Categories
- `GET /api/v1/news/categories/` - List news categories
- `POST /api/v1/news/categories/` - Create category (admin only)

### Page Management (`/api/v1/pages/`)

#### Endpoints
- `GET /api/v1/pages/` - List published pages
- `GET /api/v1/pages/{slug}/` - Get page by slug
- `GET /api/v1/pages/navigation/` - Get navigation structure
- `GET /api/v1/pages/homepage/` - Get homepage content
- `POST /api/v1/pages/` - Create page (admin only)

### Course Management (`/api/v1/courses/`)

#### Endpoints
- `GET /api/v1/courses/` - List published courses
- `GET /api/v1/courses/{id}/` - Get specific course
- `GET /api/v1/courses/featured/` - Get featured courses
- `POST /api/v1/courses/` - Create course (admin only)

### User Management (`/api/v1/users/`)

#### Endpoints
- `GET /api/v1/users/profile/` - Get current user profile
- `PUT /api/v1/users/profile/` - Update user profile
- `POST /api/v1/users/register/` - User registration

## Dashboard & Monitoring (`/api/v1/dashboard/`)

### Admin Dashboard Endpoints
- `GET /api/v1/dashboard/content_sync_status/` - Content synchronization status
- `GET /api/v1/dashboard/analytics_summary/` - Content analytics
- `GET /api/v1/dashboard/frontend_endpoints/` - Available frontend endpoints

## Content Filtering & Search

### Query Parameters

#### Status Filtering
- `?status=published` - Only published content
- `?status=draft` - Only draft content (admin only)

#### Feature Filtering
- `?featured=true` - Only featured content
- `?featured=false` - Non-featured content

#### Search & Ordering
- `?search=keyword` - Full-text search
- `?ordering=created_at` - Order by creation date
- `?ordering=-created_at` - Reverse order

#### Pagination
- `?page=1` - Page number
- `?page_size=10` - Items per page

## Content Models

### BaseContentModel Fields
All content types inherit from `BaseContentModel` and include:
- `title` - Content title
- `slug` - URL-friendly identifier
- `content` - Main content body
- `status` - Publication status (draft/published)
- `featured` - Featured content flag
- `meta_title` - SEO meta title
- `meta_description` - SEO meta description
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Blog Post Fields
- `author` - Post author
- `category` - Blog category
- `tags` - Associated tags
- `reading_time` - Estimated reading time
- `view_count` - Number of views

### Project Fields
- `technologies` - Used technologies
- `project_type` - Type of project
- `github_url` - GitHub repository URL
- `live_demo_url` - Live demo URL
- `start_date` - Project start date
- `end_date` - Project completion date

### News Item Fields
- `category` - News category
- `priority` - Priority level (low/normal/high/urgent)
- `expiry_date` - Content expiry date

### Page Fields
- `page_type` - Type of page (landing/about/contact/etc.)
- `parent` - Parent page (for hierarchical structure)
- `order` - Display order

## Error Responses

### Standard Error Format
```json
{
  "error": "Error message",
  "detail": "Detailed error description",
  "code": "ERROR_CODE"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Frontend Integration Examples

### Fetching Blog Posts
```typescript
// Fetch published blog posts
const response = await fetch('/api/v1/blog/?status=published');
const posts = await response.json();

// Fetch featured posts
const featuredResponse = await fetch('/api/v1/blog/featured/');
const featuredPosts = await featuredResponse.json();
```

### Authentication Flow
```typescript
// Login
const loginResponse = await fetch('/api/token/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
});
const tokens = await loginResponse.json();

// Use token for authenticated requests
const authResponse = await fetch('/api/v1/dashboard/content_sync_status/', {
  headers: { 'Authorization': `Bearer ${tokens.access}` }
});
```

### Content Filtering
```typescript
// Search and filter content
const searchParams = new URLSearchParams({
  search: 'django',
  featured: 'true',
  ordering: '-created_at',
  page_size: '12'
});

const response = await fetch(`/api/v1/blog/?${searchParams}`);
const results = await response.json();
```

## Health Monitoring

### Health Check Endpoints
- `GET /api/health/` - Overall system health
- `GET /api/health/database/` - Database connectivity
- `GET /api/health/content-sync/` - Content synchronization status

## SEO Integration

### SEO Endpoints
- `GET /api/v1/seo/robots.txt` - Robots.txt file
- `GET /api/v1/seo/preview/{model}/{slug}/` - SEO preview data

### Structured Data
All content includes structured data (JSON-LD) for SEO optimization.

## Rate Limiting

The API implements rate limiting to prevent abuse:
- Public endpoints: 100 requests per minute
- Authenticated endpoints: 300 requests per minute
- Admin endpoints: 1000 requests per minute

## API Documentation

Interactive API documentation is available at:
- Swagger UI: `http://localhost:8000/api/schema/swagger-ui/`
- ReDoc: `http://localhost:8000/api/schema/redoc/`
- OpenAPI Schema: `http://localhost:8000/api/schema/`

## Support

For additional support or feature requests, please refer to the development team or create an issue in the project repository.
