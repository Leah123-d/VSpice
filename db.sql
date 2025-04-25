--
-- PostgreSQL database dump
--

-- Dumped from database version 14.15 (Homebrew)
-- Dumped by pg_dump version 14.15 (Homebrew)

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
-- Name: shopping_list; Type: TABLE; Schema: public; Owner: leahputlek
--

CREATE TABLE public.shopping_list (
    id integer NOT NULL,
    spice_id integer,
    user_id integer NOT NULL,
    shopping_date date,
    comments text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.shopping_list OWNER TO leahputlek;

--
-- Name: shopping_list_id_seq; Type: SEQUENCE; Schema: public; Owner: leahputlek
--

CREATE SEQUENCE public.shopping_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shopping_list_id_seq OWNER TO leahputlek;

--
-- Name: shopping_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: leahputlek
--

ALTER SEQUENCE public.shopping_list_id_seq OWNED BY public.shopping_list.id;


--
-- Name: spices; Type: TABLE; Schema: public; Owner: leahputlek
--

CREATE TABLE public.spices (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    brand character varying(255),
    full_weight character varying(255),
    current_weight character varying(255),
    expiration_date date,
    last_purchased date,
    notes character varying(255),
    inactive boolean DEFAULT false,
    user_id integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.spices OWNER TO leahputlek;

--
-- Name: spices_id_seq; Type: SEQUENCE; Schema: public; Owner: leahputlek
--

CREATE SEQUENCE public.spices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spices_id_seq OWNER TO leahputlek;

--
-- Name: spices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: leahputlek
--

ALTER SEQUENCE public.spices_id_seq OWNED BY public.spices.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: leahputlek
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO leahputlek;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: leahputlek
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO leahputlek;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: leahputlek
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: shopping_list id; Type: DEFAULT; Schema: public; Owner: leahputlek
--

ALTER TABLE ONLY public.shopping_list ALTER COLUMN id SET DEFAULT nextval('public.shopping_list_id_seq'::regclass);


--
-- Name: spices id; Type: DEFAULT; Schema: public; Owner: leahputlek
--

ALTER TABLE ONLY public.spices ALTER COLUMN id SET DEFAULT nextval('public.spices_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: leahputlek
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: shopping_list; Type: TABLE DATA; Schema: public; Owner: leahputlek
--

INSERT INTO public.shopping_list (id, spice_id, user_id, shopping_date, comments, created_at, updated_on) VALUES (1, 1, 1, '2025-10-01', 'buy the grinder type jar', '2025-04-22 17:59:05.478792', '2025-04-22 17:59:05.478792');
INSERT INTO public.shopping_list (id, spice_id, user_id, shopping_date, comments, created_at, updated_on) VALUES (2, 2, 1, '2025-05-09', 'buy the smallest jar', '2025-04-22 17:59:05.478792', '2025-04-22 17:59:05.478792');
INSERT INTO public.shopping_list (id, spice_id, user_id, shopping_date, comments, created_at, updated_on) VALUES (3, 1, 2, '2025-01-01', 'pink pepper', '2025-04-22 17:59:05.478792', '2025-04-22 17:59:05.478792');
INSERT INTO public.shopping_list (id, spice_id, user_id, shopping_date, comments, created_at, updated_on) VALUES (4, 2, 2, '2025-04-21', 'buy largest jar', '2025-04-22 17:59:05.478792', '2025-04-22 17:59:05.478792');
INSERT INTO public.shopping_list (id, spice_id, user_id, shopping_date, comments, created_at, updated_on) VALUES (5, 3, 1, '2025-04-09', 'located on aisle 14', '2025-04-22 17:59:05.478792', '2025-04-22 17:59:05.478792');


--
-- Data for Name: spices; Type: TABLE DATA; Schema: public; Owner: leahputlek
--

INSERT INTO public.spices (id, name, brand, full_weight, current_weight, expiration_date, last_purchased, notes, inactive, user_id, created_at, updated_on) VALUES (2, 'black-pepper', 'safeway', '55', '5', NULL, NULL, 'you like whole peppercorns', false, 2, '2025-04-22 17:59:05.472108', '2025-04-22 17:59:05.472108');
INSERT INTO public.spices (id, name, brand, full_weight, current_weight, expiration_date, last_purchased, notes, inactive, user_id, created_at, updated_on) VALUES (6, 'Fall Spices', 'Whole Foods', '55', '', NULL, '2025-04-30', '', NULL, NULL, '2025-04-23 14:37:17.963377', '2025-04-23 14:37:17.963377');
INSERT INTO public.spices (id, name, brand, full_weight, current_weight, expiration_date, last_purchased, notes, inactive, user_id, created_at, updated_on) VALUES (1, 'Galanga', 'O-Organics', '55', '50', NULL, '2025-04-29', 'great for chicken noodle soup', false, 2, '2025-04-22 17:59:05.472108', '2025-04-22 17:59:05.472108');
INSERT INTO public.spices (id, name, brand, full_weight, current_weight, expiration_date, last_purchased, notes, inactive, user_id, created_at, updated_on) VALUES (4, 'Seasonal Fall Pumpkin', 'Simply Organic', '55', '', NULL, '1970-01-01', '', NULL, NULL, '2025-04-23 12:01:12.991491', '2025-04-23 12:01:12.991491');
INSERT INTO public.spices (id, name, brand, full_weight, current_weight, expiration_date, last_purchased, notes, inactive, user_id, created_at, updated_on) VALUES (5, 'Adobo All Purpose Seasoning', 'Goya', '226', '', NULL, '2025-04-22', '', NULL, NULL, '2025-04-23 12:02:15.515762', '2025-04-23 12:02:15.515762');
INSERT INTO public.spices (id, name, brand, full_weight, current_weight, expiration_date, last_purchased, notes, inactive, user_id, created_at, updated_on) VALUES (3, 'pumpkin-spice', 'O-Organics', '55', '25', NULL, '1970-01-01', 'seasonal', false, 2, '2025-04-22 17:59:05.472108', '2025-04-22 17:59:05.472108');
INSERT INTO public.spices (id, name, brand, full_weight, current_weight, expiration_date, last_purchased, notes, inactive, user_id, created_at, updated_on) VALUES (7, 'Adobo All Purpose Seasoning', 'Goya', '226', NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-25 11:11:20.723314', '2025-04-25 11:11:20.723314');
INSERT INTO public.spices (id, name, brand, full_weight, current_weight, expiration_date, last_purchased, notes, inactive, user_id, created_at, updated_on) VALUES (8, 'Adobo All Purpose Seasoning', 'Goya', '226', NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-25 11:26:02.264354', '2025-04-25 11:26:02.264354');
INSERT INTO public.spices (id, name, brand, full_weight, current_weight, expiration_date, last_purchased, notes, inactive, user_id, created_at, updated_on) VALUES (9, 'Adobo All Purpose Seasoning', 'Goya', '226', NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-25 11:28:04.761069', '2025-04-25 11:28:04.761069');
INSERT INTO public.spices (id, name, brand, full_weight, current_weight, expiration_date, last_purchased, notes, inactive, user_id, created_at, updated_on) VALUES (10, 'Adobo All Purpose Seasoning', 'Goya', '226', NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-25 11:41:01.115685', '2025-04-25 11:41:01.115685');
INSERT INTO public.spices (id, name, brand, full_weight, current_weight, expiration_date, last_purchased, notes, inactive, user_id, created_at, updated_on) VALUES (11, 'pumpkin spice', 'Simply Organic', '55', NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-25 11:46:20.608527', '2025-04-25 11:46:20.608527');
INSERT INTO public.spices (id, name, brand, full_weight, current_weight, expiration_date, last_purchased, notes, inactive, user_id, created_at, updated_on) VALUES (12, 'Adobo All Purpose Seasoning', 'Goya', '226', NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-25 12:00:47.299018', '2025-04-25 12:00:47.299018');
INSERT INTO public.spices (id, name, brand, full_weight, current_weight, expiration_date, last_purchased, notes, inactive, user_id, created_at, updated_on) VALUES (13, 'pumpkin spice', 'Simply Organic', '55', NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-25 12:03:22.771218', '2025-04-25 12:03:22.771218');
INSERT INTO public.spices (id, name, brand, full_weight, current_weight, expiration_date, last_purchased, notes, inactive, user_id, created_at, updated_on) VALUES (14, 'Adobo All Purpose Seasoning', 'Goya', '226', NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-25 12:13:08.90896', '2025-04-25 12:13:08.90896');
INSERT INTO public.spices (id, name, brand, full_weight, current_weight, expiration_date, last_purchased, notes, inactive, user_id, created_at, updated_on) VALUES (15, 'Adobo All Purpose Seasoning', 'Goya', '226', NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-25 12:19:12.023861', '2025-04-25 12:19:12.023861');
INSERT INTO public.spices (id, name, brand, full_weight, current_weight, expiration_date, last_purchased, notes, inactive, user_id, created_at, updated_on) VALUES (16, 'pumpkin spice', 'Simply Organic', '55', NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-25 12:20:50.05867', '2025-04-25 12:20:50.05867');
INSERT INTO public.spices (id, name, brand, full_weight, current_weight, expiration_date, last_purchased, notes, inactive, user_id, created_at, updated_on) VALUES (17, 'Adobo All Purpose Seasoning', 'Goya', '226', NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-25 12:22:30.853883', '2025-04-25 12:22:30.853883');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: leahputlek
--

INSERT INTO public.users (id, email, created_at, updated_on) VALUES (1, 'user1@email.com', '2025-04-22 17:59:05.467411', '2025-04-22 17:59:05.467411');
INSERT INTO public.users (id, email, created_at, updated_on) VALUES (2, 'user2@email.com', '2025-04-22 17:59:05.467411', '2025-04-22 17:59:05.467411');
INSERT INTO public.users (id, email, created_at, updated_on) VALUES (3, 'user3@email.com', '2025-04-22 17:59:05.467411', '2025-04-22 17:59:05.467411');


--
-- Name: shopping_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: leahputlek
--

SELECT pg_catalog.setval('public.shopping_list_id_seq', 5, true);


--
-- Name: spices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: leahputlek
--

SELECT pg_catalog.setval('public.spices_id_seq', 17, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: leahputlek
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: shopping_list shopping_list_pkey; Type: CONSTRAINT; Schema: public; Owner: leahputlek
--

ALTER TABLE ONLY public.shopping_list
    ADD CONSTRAINT shopping_list_pkey PRIMARY KEY (id);


--
-- Name: spices spices_pkey; Type: CONSTRAINT; Schema: public; Owner: leahputlek
--

ALTER TABLE ONLY public.spices
    ADD CONSTRAINT spices_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: leahputlek
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: leahputlek
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: shopping_list shopping_list_spice_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: leahputlek
--

ALTER TABLE ONLY public.shopping_list
    ADD CONSTRAINT shopping_list_spice_id_fkey FOREIGN KEY (spice_id) REFERENCES public.spices(id);


--
-- Name: shopping_list shopping_list_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: leahputlek
--

ALTER TABLE ONLY public.shopping_list
    ADD CONSTRAINT shopping_list_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: spices spices_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: leahputlek
--

ALTER TABLE ONLY public.spices
    ADD CONSTRAINT spices_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

