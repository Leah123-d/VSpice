-- Insert “starter” rows
INSERT INTO spices (
  name, brand, full_weight, current_weight,
  expiration_date, last_purchased, notes,
  inactive, user_id
)
VALUES
  ('Paprika', 'store', 30, 5, NULL, NULL, NULL, FALSE, 1),
  ('Cumin',   'organic', 20, 9, NULL, NULL, NULL, FALSE, 1);
