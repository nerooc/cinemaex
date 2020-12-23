-- USERS
INSERT INTO users (user_login, user_password, user_name, user_surname, user_email, newsletter) VALUES ('nerooc', 'pierogi123', 'Tomasz', 'Gajda', 'tomasz_gajda@outlook.com', FALSE);
INSERT INTO users (user_login, user_password, user_name, user_surname, user_email, newsletter) VALUES ('piotrekPL', 'Test', 'Piotr', 'Babacki', 'piotrekpl@gmail.com', TRUE);

-- DIRECTORS
INSERT INTO director(director_name, director_surname) VALUES ('Michael', 'Bay');
INSERT INTO director(director_name, director_surname) VALUES ('Cary Joji', 'Fukunaga');
INSERT INTO director(director_name, director_surname) VALUES ('April', 'Mullen');
INSERT INTO director(director_name, director_surname) VALUES ('Francis', 'Lee');
INSERT INTO director(director_name, director_surname) VALUES ('Caleb', 'Lisitsin');
INSERT INTO director(director_name, director_surname) VALUES ('Liam', 'O''Donnel');

-- MOVIES
INSERT INTO movie (id_director, movie_title, movie_description, movie_release, movie_duration, movie_img) VALUES (2, 'No Time To Die', 'No Time to Die is a forthcoming spy film and the twenty-fifth instalment in the James Bond film series produced by Eon Productions. The film features Daniel Craig in his fifth and final outing as the fictional British MI6 agent James Bond. The film is directed by Cary Joji Fukunaga from a screenplay by Neal Purvis, Robert Wade, Fukunaga, and Phoebe Waller-Bridge. Léa Seydoux, Ben Whishaw, Naomie Harris, Jeffrey Wright, Christoph Waltz, Rory Kinnear, and Ralph Fiennes reprise their roles from previous films, with Rami Malek, Lashana Lynch, Ana de Armas, Dali Benssalah, Billy Magnussen, and David Dencik joining the cast as new characters.',
 '04/02/2020', '110', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3FIXs2TB2e7fToTo8_rSMygr7-OjR0DhfLpj7QVk1TH2RGaUc');

INSERT INTO movie (id_director, movie_title, movie_description, movie_release, movie_duration, movie_img) VALUES (3, 'Wander', 'Arthur Bretnik is a mentally unstable conspiracy theorist and private eye with a traumatic past. After being hired to investigate a possible murder cover up in the small town of Wander, Arthur is plunged into a world of lies and deceit, as he quickly suspects the murder may be part of the same "conspiracy cover up" that caused the death of his daughter. Increasingly paranoid, Arthur''s sanity is tested as he attempts to filter fact from fiction and solve the case, all the while questioning if he is a pawn in a much bigger game.', 
'11/09/2020', '98', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/2AwPvNHphpZBJDqjZKVuMAbvS0v.jpg');

INSERT INTO movie (id_director, movie_title, movie_description, movie_release, movie_duration, movie_img) VALUES (4, 'Ammonite', 'In the 1840s, acclaimed self-taught palaeontologist Mary Anning works alone on the wild and brutal Southern English coastline of Lyme Regis. The days of her famed discoveries behind her, she now supports herself and her ailing widowed mother by hunting for common fossils to sell to rich tourists. One such tourist, Roderick Murchison, arrives in Lyme on the first leg of a European tour, with his young wife Charlotte, who is recuperating from a personal tragedy. He entrusts Charlotte to Mary''s care. Mary cannot afford to refuse this employment but, proud and relentlessly passionate about her work, she clashes with Charlotte. They are two women from utterly different worlds.', 
'10/16/2020', '106', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/5lx4pUHWZoOKJWsVsvurRRNW9FK.jpg');

INSERT INTO movie (id_director, movie_title, movie_description, movie_release, movie_duration, movie_img) VALUES (5, 'Vigilante', 'Sadie is a woman attending a support group following her abandonment of her husband. She works as a vigilante, helping men, women, and children escape abusive homes. She struggles with money, asking for whatever the people she helps can give and attempting to redeem a life insurance policy after her husband goes missing. Sadie is invited to the home of Andrea (Betsy Aidem) and Michael Shaund (C.J. Wilson) under the pretense of working for medical insurance. Sadie instead beats up Michael and forces him to transfer his money to his wife and leave their home. Sadie tells Andrea to pass on her details to anyone she feels needs them.', 
'11/12/2020', '130', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/7kxqUdjEZPWu8lIZSJmzsHCF4Pz.jpg');

INSERT INTO movie (id_director, movie_title, movie_description, movie_release, movie_duration, movie_img) VALUES (1, 'Transformers: The Last Knight', 'American science fiction action film based on the Transformers toy line. It is the fifth installment of the live-action Transformers film series and the sequel to Age of Extinction (2014). Like its predecessors, the film is directed by Michael Bay and features Mark Wahlberg reprising his role from Age of Extinction, while Josh Duhamel, John Turturro, and Glenn Morshower reprise their roles from the first three films, as well as Laura Haddock, Isabela Moner, Jerrod Carmichael, Santiago Cabrera, and Anthony Hopkins all joining the cast. Returning Transformers include Optimus Prime, Bumblebee, Hound, Drift, Crosshairs, Wheelie, Megatron, and Barricade.',
'06/21/2017', '168', 'https://www.movienewsletters.net/photos/192717R1.jpg');

INSERT INTO movie (id_director, movie_title, movie_description, movie_release, movie_duration, movie_img) VALUES (6, 'Skylines', 'Picking up where the second film left off, where Captain Rose Corley leads the Earth Defense fleet against the invaders nearby the moon, who are planning to destroy Earth by using the "Armada", a superweapon capable of eradicate any life on a planet. Rose''s ship destroys two motherships, but Armada fires two of the ships of human fleet. Rose''s ship destroys Armada, but at the cost of the human fleet. Five years after the events, Rose, now living as an outsider, goes to London, which was ruined by ship wreckages. She visits Dr. Mal, a doctor who is trying to find a cure to a bug which is turning the human-brain implanted alien drones, who are called Pilots, into their former hostile selves.', 
'12/10/2020', '105', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/2W4ZvACURDyhiNnSIaFPHfNbny3.jpg');

-- ROOMS
INSERT INTO room (room_name, room_seats) VALUES ('4B', 200);
INSERT INTO room (room_name, room_seats) VALUES ('5B', 200);
INSERT INTO room (room_name, room_seats) VALUES ('6B', 200);
INSERT INTO room (room_name, room_seats) VALUES ('7B', 200);
INSERT INTO room (room_name, room_seats) VALUES ('8B', 200);

-- SCREENINGS
INSERT INTO screening (id_room, id_movie, screening_date, screening_hour, screening_price) VALUES (1, 1, '12/24/2020', '15:15', 30);
INSERT INTO screening (id_room, id_movie, screening_date, screening_hour, screening_price) VALUES (2, 5, '12/25/2020', '14:15', 30);
INSERT INTO screening (id_room, id_movie, screening_date, screening_hour, screening_price) VALUES (5, 3, '12/28/2020', '20:15', 40);
INSERT INTO screening (id_room, id_movie, screening_date, screening_hour, screening_price) VALUES (2, 4, '12/28/2020', '20:15', 40);
INSERT INTO screening (id_room, id_movie, screening_date, screening_hour, screening_price) VALUES (1, 5, '12/28/2020', '20:15', 40);