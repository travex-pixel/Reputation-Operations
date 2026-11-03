# ChatGPT prompt: check 50 prospects on Google (fallback when you cannot run the Places script)

Caution before you use this. ChatGPT with browsing often cannot load Google Maps and will sometimes produce plausible-looking ratings anyway. Treat everything it returns as **unverified** until you have opened the listing yourself, and never use a number from this on a call or in an audit without checking it. The Places API script (`scripts/enrich-places.mjs`) is the reliable route; this is the fallback.

Paste everything below the line into ChatGPT (a model with web browsing turned on).

---

You are helping a small Australian business check public information about 50 trade businesses in Sydney. Accuracy matters more than completeness. Follow these rules exactly:

1. For each business, search Google for the business name plus suburb and open its Google Business Profile (the Google Maps listing). Do not use third-party sites for the rating or review count.
2. Report only what you actually read on the listing during this session. If you could not open it, leave every field for that business blank and write "could not open" in the note. Do not estimate, recall from memory, or fill in from another site.
3. For each business return one CSV row with these columns, in this order:
   id, business_name, listing_url, phone, website, google_rating, review_count, newest_review_date, one_star, two_star, three_star, owner_replies_in_last_20, note
4. Star counts (one_star, two_star, three_star) come from the rating bar chart on the listing. Leave blank if you cannot see it.
5. owner_replies_in_last_20: sort reviews by newest, look at the first 20, count how many have a response from the owner. Leave blank if you cannot do this.
6. The phone number must be the one shown on the Google listing, not from another website.
7. Output a single CSV code block with a header row and 50 rows, in the same order as the list. No commentary inside the CSV. After the CSV, list the businesses you could not open and why.
8. Do not change the id column; it links the row back to our records.

Businesses (id | name | trade | suburb):

p01 | Alpha & Omega Air Conditioning | HVAC | Kirrawee
p02 | Pipe Perfection Plumbers | Plumber | Marrickville
p03 | Ready Electrical & Air Conditioning | HVAC | Oxford Falls
p04 | Priority Plus Plumbing | Plumber | Kirrawee
p05 | Peninsula Air Conditioning (PenAir) | HVAC | Warriewood
p06 | McElroy Plumbing | Plumber | Randwick
p07 | Da-Mell Air Conditioning & Heating | HVAC | Emu Heights
p08 | Saunders Electrical Group | Electrician | Kenthurst
p09 | Hardie & Co Plumbing | Plumber | Warriewood
p10 | Shire Air Conditioning | HVAC | Gymea
p11 | Ample Air | HVAC | Emu Plains
p12 | Sanders Roofing | Roofer | Illawong
p13 | Premier Painting Company | Painter | Matraville
p14 | D'Amore Home Renovations | Renovator/Builder | Northern Beaches
p15 | DJ Daisley & Sons | Roofer | Ashfield
p16 | Eastern Beaches Painting | Painter | Randwick
p17 | Collaroy Kitchen Centre | Renovator/Builder | Collaroy
p18 | Brickwood Building | Renovator/Builder | Oatley
p19 | North Sydney Painting & Decorating | Painter | Neutral Bay
p20 | Easy Cut Painting | Painter | Kellyville
p21 | HXD Built | Renovator/Builder | Inner West
p22 | Ian's Roofing | Roofer | Inner West
p23 | Innogy Electrical | Electrician | Bondi
p24 | Roof Ranger | Roofer | Penrith
p25 | Sirrom Electrical | Electrician | Kurrajong
p26 | Brushworks Painting | Painter | Eastern Suburbs
p27 | Origin Bathrooms & Kitchens | Renovator/Builder | Leichhardt
p28 | P & K Kelly & Son Plumbing | Plumber | Kogarah
p29 | Anton's Plumbing & Gas | Plumber | Eastern Suburbs
p30 | Brennan Air Conditioning | HVAC | Castle Hill
p31 | Empire Painting Co | Painter | Randwick
p32 | SOTA Group Electrical | Electrician | Hurstville
p33 | Sydney Best Carpentry and Renovations | Renovator/Builder | Inner West
p34 | David Frith Quality Plumbing | Plumber | Kirrawee
p35 | Platinum Plumbers | Plumber | Balgowlah
p36 | Chris Wood Electrical | Electrician | Northern Beaches
p37 | Electrix All Blew | Electrician | Bilgola Plateau
p38 | Ready Set Plumb | Plumber | Lower North Shore
p39 | Sydney Painting & Maintenance | Painter | Sydney (metro)
p40 | Dura Group | Renovator/Builder | Miranda
p41 | Good Neighbour Plumbing | Plumber | Castle Hill
p42 | James & Co Plumbing | Plumber | Mona Vale
p43 | A One Korean Painting | Painter | Ryde
p44 | Action Roofing | Roofer | Baulkham Hills
p45 | Orbit Painting & Decorating | Painter | Padstow
p46 | ACG Air Conditioning Guys | HVAC | Canterbury
p47 | Kmelectric | Electrician | Leichhardt
p48 | True Local Electricians | Electrician | Caringbah
p49 | iPaint & Co | Painter | Merrylands
p50 | Excel Roof Restoration | Roofer | Sutherland Shire
