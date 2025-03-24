SELECT name, collation_name FROM sys.databases;
GO
ALTER DATABASE db_ab6b0d_evidencijaimovine SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_ab6b0d_evidencijaimovine COLLATE Latin1_General_100_CI_AI_SC_UTF8;
GO
ALTER DATABASE db_ab6b0d_evidencijaimovine SET MULTI_USER;
GO
SELECT name, collation_name FROM sys.databases;
GO

DROP TABLE OpremeArhiva;
DROP TABLE Opreme;

CREATE TABLE Opreme (
    Sifra INT PRIMARY KEY IDENTITY(1,1),
    Naziv VARCHAR(100) NOT NULL,
    Tip VARCHAR(50) NOT NULL,
    SerijskiBroj VARCHAR(50) UNIQUE NOT NULL,
    DatumNabave DATETIME
);

CREATE TABLE OpremeArhiva (
    Sifra INT IDENTITY(1,1) PRIMARY KEY,
    OpremaID INT NOT NULL FOREIGN KEY (OpremaID) REFERENCES Opreme(Sifra),
    Razlog VARCHAR(255),
    DatumPremjestaja DATETIME
);

INSERT INTO Opreme (Naziv, Tip, SerijskiBroj, DatumNabave) VALUES ('Vatrogasni aparat', 'Protupožarna oprema', 'VA-20240324', '2024-03-24 10:30:00');  

INSERT INTO OpremeArhiva (OpremaID, Razlog, DatumPremjestaja) VALUES (1, 'Oštećenje prilikom upotrebe', '2025-01-15 14:00:00');  
