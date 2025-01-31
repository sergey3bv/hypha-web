-- Custom SQL migration file, put your code below! --
CREATE OR REPLACE FUNCTION generate_slug()
RETURNS TRIGGER AS $$
BEGIN
  NEW.slug := lower(replace(NEW.title, ' ', '-'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_documents
BEFORE INSERT ON documents
FOR EACH ROW
EXECUTE FUNCTION generate_slug();
