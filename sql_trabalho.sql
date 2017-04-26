drop table tb_estoque
CREATE TABLE tb_estoque(
id_estoque		SERIAL PRIMARY KEY,
tecido_vermelho		NUMERIC(7,2),
tecido_branco		NUMERIC(7,2),
tecido_preto		NUMERIC(7,2),
espuma			NUMERIC(7,2)
);

CREATE TABLE tb_pedido(
id_pedido		SERIAL PRIMARY KEY,
id_estoque		SERIAL REFERENCES tb_estoque (id_estoque),
nome			VARCHAR(255),
bojo_vermelho		NUMERIC(7,2),
bojo_branco		NUMERIC(7,2),
bojo_preto		NUMERIC(7,2)
);

