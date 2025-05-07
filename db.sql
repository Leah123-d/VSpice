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
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_spice FOREIGN KEY (user_id) REFERENCES public.users(id)
);

--
-- Name: shopping_lists; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shopping_lists(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES public.users(id) NOT NULL,
    shopping_date DATE,
    comments TEXT,
    created_at timestamp NOT NULL DEFAULT NOW(),
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: list_items; Type: TABLE; Schema: public; Owner: leahputlek
--

CREATE TABLE public.shopping_list_items (
    id integer NOT NULL,
    shopping_list_id integer NOT NULL,
    spice_id integer NOT NULL,
    quantity integer,
    name VARCHAR(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_shopping_lists FOREIGN KEY (shopping_list_id) REFERENCES public.shopping_lists(id),
    CONSTRAINT fk_spice FOREIGN KEY (spice_id) REFERENCES public.spices(id)
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
-- Data for Name: shopping_lists; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.shopping_lists (id, user_id, shopping_date, comments) VALUES (1, 1, '2025-10-01', 'buy the grinder type jar');
INSERT INTO public.shopping_lists (id, user_id, shopping_date, comments) VALUES (2, 2, '2025-05-09', 'buy the smallest jar');
INSERT INTO public.shopping_lists (id, user_id, shopping_date, comments) VALUES (3, 1, '2025-01-01', 'pink pepper');
INSERT INTO public.shopping_lists (id, user_id, shopping_date, comments) VALUES (4, 2, '2025-04-21', 'buy largest jar');
INSERT INTO public.shopping_lists (id, user_id, shopping_date, comments) VALUES (5, 3, '2025-04-09', 'located on aisle 14');

--
-- Data for Name: list_items; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.shopping_list_items (id, shopping_list_id, spice_id, quantity, name) VALUES (1, 2, 1, 1, 'seasonal');
INSERT INTO public.shopping_list_items (id, shopping_list_id, spice_id, quantity, name) VALUES (2, 2, 2, 1, 'winter'); 
INSERT INTO public.shopping_list_items (id, shopping_list_id, spice_id, quantity, name) VALUES (3, 2, 3, 1, 'quick trip'); 
INSERT INTO public.shopping_list_items (id, shopping_list_id, spice_id, quantity, name) VALUES (4, 3, 1, 1, 'night'); 
INSERT INTO public.shopping_list_items (id, shopping_list_id, spice_id, quantity, name) VALUES (5, 3, 2, 1, 'afternoon'); 

-- PostgreSQL database dump complete
--