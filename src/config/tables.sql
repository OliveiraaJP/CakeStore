CREATE TABLE cakes (
    id serial PRIMARY KEY NOT NULL,
    name text NOT NULL UNIQUE,
    price numeric NOT NULL,
    image text NOT NULL,
    description text
);

CREATE TABLE clients(
    id serial PRIMARY KEY NOT NULL,
    name text NOT NULL,
    adress text NOT NULL,
    phone varchar(11) NOT NULL
);

CREATE TABLE orders (
    id serial PRIMARY KEY NOT NULL,
    "clientId" integer NOT NULL REFERENCES "clients"("id"),
    "cakeId" integer NOT NULL REFERENCES "cakes"("id"),
    quantity integer NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
