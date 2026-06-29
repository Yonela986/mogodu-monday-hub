
DROP POLICY "Anyone can create a booking" ON public.bookings;
CREATE POLICY "Anyone can create a valid booking" ON public.bookings
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(full_name) BETWEEN 1 AND 120
    AND length(phone) BETWEEN 5 AND 30
    AND length(email) BETWEEN 3 AND 254
    AND email LIKE '%_@_%.__%'
    AND booking_date >= CURRENT_DATE
    AND guests BETWEEN 1 AND 50
    AND (special_requests IS NULL OR length(special_requests) <= 1000)
  );

DROP POLICY "Anyone can send a message" ON public.contact_messages;
CREATE POLICY "Anyone can send a valid message" ON public.contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(full_name) BETWEEN 1 AND 120
    AND length(email) BETWEEN 3 AND 254
    AND email LIKE '%_@_%.__%'
    AND length(message) BETWEEN 1 AND 2000
  );
