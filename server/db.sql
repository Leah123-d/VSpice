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
    user_id INTEGER REFERENCES public.users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--
-- Name: shopping_list; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.shopping_list(
    id SERIAL PRIMARY KEY,
    spice_id INTEGER REFERENCES public.spices(id),
    user_id INTEGER REFERENCES public.users(id) NOT NULL,
    shopping_date DATE,
    comments TEXT,
    created_at timestamp NOT NULL DEFAULT NOW(),
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
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

INSERT INTO public.spices (name, brand, full_weight, current_weight, expiration_date, last_purchased, notes, inactive, user_id)
VALUES
  ('ginger', 'O-Organics', '55', '50', null, null, 'great for ginger tea', false, 2),
  ('black-pepper', 'safeway', '55', '20', null, null, 'you like whole peppercorns', false, 2),
  ('pumpkin-spice', 'O-Organics', '55', '40', null, null, 'seasonal', false, 2);

   
--
-- Data for Name: shopping_list; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.shopping_list (spice_id, user_id, shopping_date, comments)
VALUES
  (1, 1, '2025-10-01', 'buy the grinder type jar'),
  (2, 1, '2025-05-09', 'buy the smallest jar'),
  (1, 2, '2025-1-01',   'pink pepper'),
  (2, 2, '2025-04-21', 'buy largest jar'),
  (3, 1, '2025-04-09', 'located on aisle 14');



-- PostgreSQL database dump complete
--
