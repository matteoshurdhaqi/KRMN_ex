# API che gestiscono TODO per un reminder

- GET/todos -> ritorna la lista dei todo non completati
- GET/todos/:id -> ritorna la todo con id passato
- GET/todos&completed=true -> ritorna anche todo completati
- POST/todos -> crea un nuovo todo
- POST/todos/:id/complete -> segna todo come completo
