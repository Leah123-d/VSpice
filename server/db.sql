-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW(),
    updated_on timestamp default CURRENT_TIMESTAMP not null
);

--
-- Name: spices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.spices (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255),
    full_weight VARCHAR(255),
    current_weight VARCHAR(255),
    expiration_date DATE,
    last_purchased DATE,
    notes VARCHAR(255),
    inactive BOOLEAN DEFAULT FALSE, 
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
);

--
-- Name: shopping_list; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.shopping_list(
    id SERIAL PRIMARY KEY,
    spice_id INTEGER REFERENCES spices(id),
    shopping_date DATE,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    comments TEXT,
    created_at timestamp NOT NULL DEFAULT NOW(),
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--
INSERT INTO public.users (email)
VALUES 
    ('user1@email.com'),
    ('user2@email.com'),
    ('user3@email.com');

--
-- Data for Name: spices; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.spices (name,	brand,	full_weight,	current_weight,	expiration_date,	last_purchased,	notes,	inactive)
VALUES
    ('ginger', 'O-Organics', '55', '50', null, null, "great for ginger tea"),
    ('black-pepper', 'safeway', '55', '20', null, null, "you like whole peppercorns"),
   ('pumpking-spice', 'O-Organics', '55', '40', null, null, "seasonal");
   
--
-- Data for Name: shopping_list; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.shopping_list (shopping_date, comments)
VALUES
    ('2025-10-01', 'buy the grider type jar'),
    ('2025-05-09', 'buy the smallest jar'),
    ('2025-04-09', 'located on aisle 14' );


-- PostgreSQL database dump complete
--
