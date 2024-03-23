# TickETCD - BDNR Project

- [Run](#run)
- [Endpoints](#endpoints)
- [API](#api)
- [Data & Keys](#data--keys)

## Run

O projecto está disponível apenas em Docker:

```bash
$ cd src/
$ bash start.sh
```

`start.sh` irá:

- Criar toda a infraestrutura/containers do projecto: 5 nós ectd e 3 servers;
- Instalar as dependências necessárias do Python para os passos seguintes;
- Gerar dados;
- Povoar o cluster com os dados gerados de forma paralela;

Os servidores estão disponíveis em [localhost:3001](http://localhost:3001), [localhost:3002](http://localhost:3002) ou [localhost:3003](http://localhost:3003).

## Endpoints



## API



## Data & Keys

### Data

Os dados gerados seguem as configurações presentes no header do ficheiro `generate.py`:

```py
NUM_USERS = 50
NUM_EVENTS = 20

# Probabilidade de um evento ser marcado como favorito
FAVOURITE_PROBABILITY = 0.3

# Acrescentar ou remover fields de acordo com o que queremos que seja alvo de pesquisa nos eventos
EVENT_SEARCH_FIELDS = ['name', 'description', 'location']
```

Atualmente há geração completa dos seguintes agregados:

- `User` (username, user, email, password, role);
- `Event` (id, name, description, location);

E há geração das seguintes relações:

- `Favourite` (entre um user e eventos)

### Keys

As keys seguem uma formatação rígida:

```json
{
    // User
    "user:<USERNAME>": { 
        "name": "something", 
        "username": "something", 
        "email": "something", 
        "password": "something", 
        "role": "something"
    },

    // Event
    "event:<ID>": {
        "name": "something", 
        "description": "something", 
        "location": "something"
    },

    // Search Events
    "search:event:<WORD>": [
        "EVENT_ID_1",
        "EVENT_ID_2",
        "EVENT_ID_3",
    ],

    // Favourite relationship
    "favourite:<USERNAME>": [
        "EVENT_ID_1",
        "EVENT_ID_2",
        "EVENT_ID_3",
    ]
}
```