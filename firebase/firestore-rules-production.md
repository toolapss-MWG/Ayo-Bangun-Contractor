# Firebase Production Security Rules Design

## Roles
- owner: full access
- admin: operational CRUD
- mandor: create field reports, attendance, material usage

## Collections
users
projects
materials
stock_requests
material_usage
attendance
daily_targets
reports
photos

Implement with Firebase Authentication custom claims:
owner, admin, mandor.
