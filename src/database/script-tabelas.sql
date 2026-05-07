CREATE DATABASE CBacad;
USE CBacad;

CREATE TABLE endereco (
CEP CHAR(8) PRIMARY KEY,
rua VARCHAR(100),
numero VARCHAR(10),
bairro VARCHAR(100) NOT NULL,
estado CHAR(2) NOT NULL
);

INSERT INTO endereco VALUES
(12345678, 'Maria Filipina', '120', 'Monte Alegre', 'SP'),
(87654321, 'Filipina Maria', '210', 'Jardins', 'SP'),
(18273645, 'Mario Felipe', '102', 'Esmeralda', 'SC');

CREATE TABLE academia (
idacademia INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
fk_CEP CHAR(8) NOT NULL,
CONSTRAINT fk_endereco FOREIGN KEY (fk_CEP) REFERENCES endereco(CEP) 
);

INSERT INTO academia VALUES
(DEFAULT, 'Iron Fit', '12345678'),
(DEFAULT, 'Punho de Ferro', '87654321'),
(DEFAULT, 'Ferro e Punhos', '18273645');

SELECT * FROM academia;

CREATE TABLE usuario (
idusuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
email VARCHAR(50) NOT NULL,
senha VARCHAR(100) NOT NULL,
genero CHAR(1),
CONSTRAINT chk_genero CHECK (genero IN ('M', 'F', 'O')),
fkAcademia INT,
CONSTRAINT fk_academia_const FOREIGN KEY (fkAcademia) REFERENCES academia(idacademia)
);

INSERT INTO usuario (nome, email, senha, genero, fkAcademia) VALUES
('Cauã', 'caua.martos@sptech.school', 'senha123', 'M', 1),
('Luana', 'luana.martos@sptech.school', 'senha123', 'F', 2),
('Martos', 'martos.caua@sptech.school', 'senha123', 'O', 3);

SELECT * FROM usuario;

CREATE TABLE post (
idpost INT PRIMARY KEY AUTO_INCREMENT,
esporte VARCHAR(10),
CONSTRAINT chk_esporte CHECK (esporte IN ('Muay Thai', 'Jiu-Jitsu', 'Misto')),
dtTreino DATETIME,
descricao VARCHAR(200),
fkUsuario INT,
CONSTRAINT fk_usuario_post FOREIGN KEY (fkUsuario) REFERENCES usuario(idusuario)
);

INSERT INTO post (esporte, dtTreino, descricao, fkUsuario) VALUES
('Muay Thai', '2026-10-12', 'Lorem Ipslum', '1'),
('Jiu-Jitsu', '2026-11-12', 'Lorem Ipslum', '2'),
('Misto', '2026-12-12', 'Lorem Ipslum', '3');

SELECT * FROM post;

CREATE TABLE curtida (
fkPost INT,
fkUsuario INT,
PRIMARY KEY (fkPost, fkUsuario), 
CONSTRAINT fk_post_curtida FOREIGN KEY (fkPost) REFERENCES post(idpost),
CONSTRAINT fk_usuario_curtida FOREIGN KEY (fkUsuario) REFERENCES usuario(idusuario)
);

INSERT INTO curtida (fkPost, fkUsuario) VALUES
(2, 1),
(1, 3),
(3, 2);

SELECT * FROM curtida;

SELECT u.idusuario,
u.nome AS nome_usuario,
u.email,
u.genero,
a.idacademia,
a.nome AS nome_academia,
e.CEP,
e.rua,
e.numero,
e.bairro,
e.estado,
p.idpost,
p.esporte,
p.dtTreino,
p.descricao,
c.fkPost AS post_curtido,
c.fkUsuario AS usuario_que_curtiu
FROM usuario u
LEFT JOIN academia a ON u.fkAcademia = a.idacademia
LEFT JOIN endereco e ON a.fk_CEP = e.CEP
LEFT JOIN post p ON u.idusuario = p.fkUsuario
LEFT JOIN curtida c ON p.idpost = c.fkPost;