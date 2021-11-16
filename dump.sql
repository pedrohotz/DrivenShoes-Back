--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

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
-- Name: cards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cards (
    id integer NOT NULL,
    card_number character varying(20) NOT NULL,
    security_number character varying(4) NOT NULL,
    expiration_date date NOT NULL,
    name character varying(255) NOT NULL,
    payment_id integer NOT NULL
);


ALTER TABLE public.cards OWNER TO postgres;

--
-- Name: checkout; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.checkout (
    id integer NOT NULL,
    user_id integer NOT NULL,
    total_price numeric NOT NULL,
    final_data date NOT NULL
);


ALTER TABLE public.checkout OWNER TO postgres;

--
-- Name: checkout_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.checkout_products (
    id integer NOT NULL,
    checkout_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public.checkout_products OWNER TO postgres;

--
-- Name: payment_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment_data (
    id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.payment_data OWNER TO postgres;

--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price numeric NOT NULL,
    "category_Id" integer NOT NULL,
    description character varying(255) NOT NULL,
    url_image character varying(255) NOT NULL
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: product_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_category (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.product_category OWNER TO postgres;

--
-- Name: public.cards_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."public.cards_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."public.cards_id_seq" OWNER TO postgres;

--
-- Name: public.cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."public.cards_id_seq" OWNED BY public.cards.id;


--
-- Name: public.checkout_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."public.checkout_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."public.checkout_id_seq" OWNER TO postgres;

--
-- Name: public.checkout_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."public.checkout_id_seq" OWNED BY public.checkout.id;


--
-- Name: public.checkout_products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."public.checkout_products_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."public.checkout_products_id_seq" OWNER TO postgres;

--
-- Name: public.checkout_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."public.checkout_products_id_seq" OWNED BY public.checkout_products.id;


--
-- Name: public.payment_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."public.payment_data_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."public.payment_data_id_seq" OWNER TO postgres;

--
-- Name: public.payment_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."public.payment_data_id_seq" OWNED BY public.payment_data.id;


--
-- Name: public.product_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."public.product_category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."public.product_category_id_seq" OWNER TO postgres;

--
-- Name: public.product_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."public.product_category_id_seq" OWNED BY public.product_category.id;


--
-- Name: public.product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."public.product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."public.product_id_seq" OWNER TO postgres;

--
-- Name: public.product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."public.product_id_seq" OWNED BY public.product.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token character varying(100) NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: public.sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."public.sessions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."public.sessions_id_seq" OWNER TO postgres;

--
-- Name: public.sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."public.sessions_id_seq" OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: public.users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."public.users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."public.users_id_seq" OWNER TO postgres;

--
-- Name: public.users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."public.users_id_seq" OWNED BY public.users.id;


--
-- Name: cards id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards ALTER COLUMN id SET DEFAULT nextval('public."public.cards_id_seq"'::regclass);


--
-- Name: checkout id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checkout ALTER COLUMN id SET DEFAULT nextval('public."public.checkout_id_seq"'::regclass);


--
-- Name: checkout_products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checkout_products ALTER COLUMN id SET DEFAULT nextval('public."public.checkout_products_id_seq"'::regclass);


--
-- Name: payment_data id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_data ALTER COLUMN id SET DEFAULT nextval('public."public.payment_data_id_seq"'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public."public.product_id_seq"'::regclass);


--
-- Name: product_category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_category ALTER COLUMN id SET DEFAULT nextval('public."public.product_category_id_seq"'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public."public.sessions_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public."public.users_id_seq"'::regclass);


--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cards (id, card_number, security_number, expiration_date, name, payment_id) FROM stdin;
\.


--
-- Data for Name: checkout; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.checkout (id, user_id, total_price, final_data) FROM stdin;
\.


--
-- Data for Name: checkout_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.checkout_products (id, checkout_id, product_id, quantity) FROM stdin;
1	1	1	1
2	1	2	3
3	1	3	2
4	1	4	1
5	2	1	1
6	2	2	3
7	2	3	2
8	2	4	1
9	3	1	1
10	3	2	3
11	3	3	2
12	3	4	1
13	4	1	1
14	4	2	3
15	4	3	2
16	4	4	1
17	5	1	1
18	5	2	3
19	5	3	2
20	5	4	1
21	6	1	1
22	6	2	3
23	6	3	2
24	6	4	1
25	7	1	1
26	7	2	3
27	7	3	2
28	7	4	1
\.


--
-- Data for Name: payment_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment_data (id, user_id) FROM stdin;
21	1
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (id, name, price, "category_Id", description, url_image) FROM stdin;
1	Tˆnis Nike Downshifter 11	199.99	1	O Tˆnis Nike Downshifter 11 Masculino ‚ o seu novo tˆnis de corrida favorito! O modelo apresenta cabedal em malha de tramas abertas que auxiliam na flexibilidade e na ventila‡Æo interna, que afasta o mau odor.	https://static.netshoes.com.br/produtos/tenis-nike-downshifter-11-masculino/26/HZM-5208-026/HZM-5208-026_zoom1.jpg?ts=1630603834&
2	Tˆnis Adidas Runfalcon 2.0	179.99	1	Na esteira ou pelas ruas, domine a corrida com o novo Tˆnis Masculino da Adidas.	https://static.netshoes.com.br/produtos/tenis-adidas-runfalcon-20-masculino/26/3ZP-0573-026/3ZP-0573-026_zoom1.jpg?ts=1626193145&
3	Tˆnis Adidas Puremotion Adapt Slipon Zebra	259.99	1	Inspirado na corrida, esse tˆnis casual feminino da Adidas ‚ o cal‡ado ideal para a mulherada que ama conforto e estilo.	https://static.netshoes.com.br/produtos/tenis-adidas-puremotion-adapt-slipon-zebra-feminino/38/3ZP-1060-038/3ZP-1060-038_zoom2.jpg?ts=1625514642&?ims=544x
4	Tˆnis Nike Renew In-Season TR 11	279.99	1	Treine em busca do melhor resultado usando o Tˆnis Nike Renew In-Season Tr 11.	https://static.netshoes.com.br/produtos/tenis-nike-renew-in-season-tr-11-feminino/96/2IC-3186-296/2IC-3186-296_zoom2.jpg?ts=1626301344&
5	Tˆnis Nike Court Vision Low Next Nature	449.99	2	Com design cl ssico e atemporal, o Tˆnis Nike Court Vision Lo Be Feminino ‚ a escolha certa para a versatilidade e atitude nas combina‡äes urbanas.	https://static.netshoes.com.br/produtos/tenis-nike-court-vision-low-next-nature-feminino/05/2IC-3442-805/2IC-3442-805_zoom2.jpg?ts=1632823146&
6	Tˆnis Adidas Grand Court	169.99	2	Direto dos anos 70, o Tˆnis Masculino Adidas Grand Court ‚ um cl ssico para quem busca estilo autˆntico e conforto.	https://static.netshoes.com.br/produtos/tenis-adidas-grand-court-masculino/08/NQQ-0548-008/NQQ-0548-008_zoom1.jpg?ts=1577982055&
\.


--
-- Data for Name: product_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_category (id, name) FROM stdin;
1	corrida
2	casual
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, user_id, token) FROM stdin;
98	1	12345
99	69	f8b6e941-0b0b-44ac-b632-a5a575dbe51d
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password) FROM stdin;
7	Pedro	pedro@email.com	$2b$12$0jl9KzwpyXFUFnh8bC6Tt.BZdv6F9oZmwY7ctc8QHS3YdNenioUV6
8	pedro dois 	pedro@email2.com	$2b$12$RjrQLWW8hYKGO.ckM6b8BOQrPKzm6.xaMkXGx.kPEs0QKZioOOdse
55	Pedro	pedrin@email.com	$2b$12$C83e996LqD1d5deYj7.1c.QH3NjQd/nKEzvGuooVbC4BrHjpILBCe
56	pedro2	pedrodois@email.com	$2b$12$yd4kghO0YHCImmB1tYZxLe1ZpUIrwTQ.2e6U6drfkv1Xa52pxFgce
57	pedro	pedro2@email.com	$2b$12$wo4YAK2pCwHF81NpUskQneLQFauEhN48xiHzTgyQvEdvLTFq4SHFe
\.


--
-- Name: public.cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."public.cards_id_seq"', 7, true);


--
-- Name: public.checkout_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."public.checkout_id_seq"', 7, true);


--
-- Name: public.checkout_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."public.checkout_products_id_seq"', 28, true);


--
-- Name: public.payment_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."public.payment_data_id_seq"', 21, true);


--
-- Name: public.product_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."public.product_category_id_seq"', 2, true);


--
-- Name: public.product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."public.product_id_seq"', 6, true);


--
-- Name: public.sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."public.sessions_id_seq"', 99, true);


--
-- Name: public.users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."public.users_id_seq"', 70, true);


--
-- Name: cards cards_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pk PRIMARY KEY (id);


--
-- Name: checkout checkout_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checkout
    ADD CONSTRAINT checkout_pk PRIMARY KEY (id);


--
-- Name: checkout_products checkout_products_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checkout_products
    ADD CONSTRAINT checkout_products_pk PRIMARY KEY (id);


--
-- Name: payment_data payment_data_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_data
    ADD CONSTRAINT payment_data_pk PRIMARY KEY (id);


--
-- Name: product_category product_category_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT product_category_pk PRIMARY KEY (id);


--
-- Name: product product_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pk PRIMARY KEY (id);


--
-- Name: cards public.cards_card_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT "public.cards_card_number_key" UNIQUE (card_number);


--
-- Name: sessions sessions_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pk PRIMARY KEY (id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

