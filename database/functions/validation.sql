-- sprawdzanie pól
-- sprawdzanie czy juz nie istnieje juz taki element
CREATE OR REPLACE FUNCTION projekt.waliduj_dane_czlowieka()
RETURNS TRIGGER AS 
$$
BEGIN
IF length(NEW.imie) < 2
THEN RAISE EXCEPTION 'Zbyt krótkie imię';
ELSIF length(NEW.nazwisko) < 2
THEN RAISE EXCEPTION 'Zbyt krótkie nazwisko';
ELSIF length(NEW.telefon) < 9
THEN RAISE EXCEPTION 'Niepoprawny numer telefonu';
ELsIF NEW.email NOT LIKE '%_@_%._%'
THEN RAISE EXCEPTION 'Niepoprawny email.';
END IF;
RETURN NEW;
END
$$
LANGUAGE plpgsql;

-- wyzwalacz przzed utworzeniem nowego zamowienia
CREATE TRIGGER walidator_dane
BEFORE INSERT OR UPDATE ON projekt.zamowienie
FOR EACH ROW EXECUTE PROCEDURE projekt.waliduj_dane_czlowieka();