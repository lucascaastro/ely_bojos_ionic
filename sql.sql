CREATE DATABASE "trabalho_ely"
TEMPLATE template0
ENCODING 'WIN1252'
CONNECTION LIMIT -1;

CREATE TABLE tb_pedido(
  id_pedido		SERIAL PRIMARY KEY,
  qtd_pedido		NUMERIC(7,2),
  total			NUMERIC(7,2)
);

INSERT INTO tb_pedido(qtd_pedido,total)
VALUES
(10,12);

CREATE TABLE mat_estoque(
id_material		SERIAL PRIMARY KEY,
id_pedido 		INTEGER REFERENCES tb_pedido (id_pedido),
tecido_vermelho		NUMERIC(7,2),
tecido_preto		NUMERIC(7,2),
tecido_braco		NUMERIC(7,2),
espuma			NUMERIC(7,2),
placas			NUMERIC(7,2)
);
