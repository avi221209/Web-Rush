import type { LifeReceipt } from '../types/receipt';

export const MOCK_RECEIPTS: LifeReceipt[] = [
  // --- MARCH 2026: CHAPTER 01 - THE ROUTINE & MIDNIGHT IDEAS ---
  {
    id: 'rcpt-001',
    category: 'search',
    title: 'Search: "architectural acoustics principles PDF"',
    description: 'Searched on Google Chrome desktop during late study session.',
    timestamp: '2026-03-02T23:14:00Z',
    tags: ['study', 'acoustics', 'architecture', 'late-night'],
    metadata: { browser: 'Chrome Desktop', queryTimeMs: 140 }
  },
  {
    id: 'rcpt-002',
    category: 'music',
    title: 'Played: "Subterranean Homesick Alien" by Radiohead',
    artist: 'Radiohead',
    description: 'Streamed on Spotify Premium, noise cancelling headphones.',
    timestamp: '2026-03-02T23:22:00Z',
    tags: ['ambient', 'radiohead', 'study', 'focus'],
    metadata: { duration: '4:27', platform: 'Spotify' }
  },
  {
    id: 'rcpt-003',
    category: 'note',
    title: 'Note: "Sound design for quiet spaces"',
    description: 'Drafted in Apple Notes: "What if room acoustics could change based on ambient light? Wood paneling absorbs high frequencies."',
    timestamp: '2026-03-02T23:45:00Z',
    tags: ['idea', 'acoustics', 'notes', 'late-night'],
    metadata: { wordCount: 42, folder: 'Ideas' }
  },
  {
    id: 'rcpt-004',
    category: 'purchase',
    title: 'Midnight Coffee & Cinnamon Roll',
    description: 'Card purchase at Blue Tokai Coffee Roasters - Bandra West.',
    timestamp: '2026-03-03T00:15:00Z',
    amount: 480.00,
    location: { name: 'Blue Tokai Coffee Roasters', city: 'Mumbai', lat: 19.0600, lng: 72.8362 },
    tags: ['coffee', 'late-night', 'food', 'bandra'],
    metadata: { paymentMethod: 'Contactless Visa', receiptNo: 'BT-88921' }
  },
  {
    id: 'rcpt-005',
    category: 'place',
    title: 'Checked in: Blue Tokai Bandra West',
    description: 'Location ping from Foursquare / Swarm.',
    timestamp: '2026-03-03T00:18:00Z',
    location: { name: 'Blue Tokai Coffee Roasters', city: 'Mumbai', lat: 19.0600, lng: 72.8362 },
    tags: ['place', 'bandra', 'coffee'],
    metadata: { durationMinutes: 45 }
  },

  {
    id: 'rcpt-006',
    category: 'photo',
    title: 'Photo: "Steam on rainy glass window"',
    description: 'Shot on iPhone 15 Pro, 35mm lens filter. Damp night street in Bandra.',
    timestamp: '2026-03-03T00:32:00Z',
    location: { name: 'Pali Hill, Bandra', city: 'Mumbai', lat: 19.0620, lng: 72.8310 },
    tags: ['photo', 'rain', 'moody', 'bandra'],
    photoMood: 'Melancholic',
    metadata: { iso: 400, shutter: '1/60s', aperture: 'f/1.8' }
  },
  {
    id: 'rcpt-007',
    category: 'message',
    title: 'Message to Anya: "Still up working on the acoustics project?"',
    person: 'Anya Sen',
    description: 'Sent via iMessage.',
    timestamp: '2026-03-03T00:41:00Z',
    tags: ['message', 'anya', 'collaboration'],
    metadata: { status: 'Delivered', app: 'iMessage' }
  },
  {
    id: 'rcpt-008',
    category: 'music',
    title: 'Played: "Avril 14th" by Aphex Twin',
    artist: 'Aphex Twin',
    description: 'Streamed on Spotify while walking home.',
    timestamp: '2026-03-03T01:05:00Z',
    tags: ['piano', 'ambient', 'night-walk'],
    metadata: { duration: '2:05', platform: 'Spotify' }
  },

  // March 10 - Movie & dinner with friends
  {
    id: 'rcpt-009',
    category: 'purchase',
    title: 'Cinema Ticket: "Dune Part Two - IMAX 70mm"',
    description: 'BookMyShow booking for PVR Icon Phoenix Palladium.',
    timestamp: '2026-03-10T18:30:00Z',
    amount: 1450.00,
    location: { name: 'PVR Icon Phoenix Palladium', city: 'Mumbai', lat: 18.9950, lng: 72.8240 },
    tags: ['movie', 'imax', 'lower-parel'],
    metadata: { seats: 'H12, H13', format: 'IMAX 2D' }
  },
  {
    id: 'rcpt-010',
    category: 'movie',
    title: 'Watched: "Dune: Part Two"',
    description: 'Rated 5 stars on Letterboxd: "Visceral sound design and immense scale."',
    timestamp: '2026-03-10T21:40:00Z',
    rating: 5,
    tags: ['movie', 'letterboxd', 'cinema'],
    metadata: { rating: 5, director: 'Denis Villeneuve' }
  },
  {
    id: 'rcpt-011',
    category: 'place',
    title: 'Visited: Social Lower Parel',
    description: 'Post-movie drinks and dinner with Kabir and Anya.',
    timestamp: '2026-03-10T22:05:00Z',
    location: { name: 'Social Lower Parel', city: 'Mumbai', lat: 18.9962, lng: 72.8251 },
    tags: ['food', 'drinks', 'social', 'lower-parel'],
    metadata: { groupSize: 3 }
  },
  {
    id: 'rcpt-012',
    category: 'purchase',
    title: 'Dinner Bill: Craft Beers & Craft Nachos',
    description: 'Payment split via UPI at Social Lower Parel.',
    timestamp: '2026-03-10T23:30:00Z',
    amount: 2120.00,
    location: { name: 'Social Lower Parel', city: 'Mumbai', lat: 18.9962, lng: 72.8251 },
    tags: ['purchase', 'dinner', 'social'],
    metadata: { paymentMethod: 'GPay UPI' }
  },
  {
    id: 'rcpt-013',
    category: 'photo',
    title: 'Photo: "Neon sign reflection on dinner table"',
    description: 'Group photo flash shot at Social.',
    timestamp: '2026-03-10T23:42:00Z',
    location: { name: 'Social Lower Parel', city: 'Mumbai', lat: 18.9962, lng: 72.8251 },
    tags: ['photo', 'friends', 'nightlife'],
    person: 'Kabir & Anya',
    metadata: { flash: 'On', iso: 800 }
  },

  // March 18 - Architectural research & Book purchase
  {
    id: 'rcpt-014',
    category: 'search',
    title: 'Search: "Junya Ishigami architecture exhibition catalog"',
    description: 'Google search while browsing indie bookstore sites.',
    timestamp: '2026-03-18T14:10:00Z',
    tags: ['architecture', 'books', 'research'],
    metadata: { device: 'MacBook Air' }
  },
  {
    id: 'rcpt-015',
    category: 'purchase',
    title: 'Book Purchase: "Freeing Architecture" by Junya Ishigami',
    description: 'Online purchase from Wayword & Wise Bookstore, Kala Ghoda.',
    timestamp: '2026-03-18T14:35:00Z',
    amount: 3200.00,
    location: { name: 'Wayword & Wise', city: 'Mumbai', lat: 18.9275, lng: 72.8330 },
    tags: ['books', 'architecture', 'kala-ghoda'],
    metadata: { store: 'Wayword & Wise' }
  },
  {
    id: 'rcpt-016',
    category: 'event',
    title: 'Attended: "Urban Density & Acoustic Landscapes Panel"',
    description: 'Exhibition talk at Max Mueller Bhavan, Kala Ghoda.',
    timestamp: '2026-03-21T17:00:00Z',
    venue: 'Max Mueller Bhavan',
    location: { name: 'Max Mueller Bhavan', city: 'Mumbai', lat: 18.9288, lng: 72.8325 },
    tags: ['event', 'lecture', 'architecture', 'kala-ghoda'],
    metadata: { ticketType: 'RSVP Free' }
  },
  {
    id: 'rcpt-017',
    category: 'place',
    title: 'Visited: Kala Ghoda Art District',
    description: 'Strolling through heritage streets post-lecture.',
    timestamp: '2026-03-21T19:15:00Z',
    location: { name: 'Kala Ghoda Art District', city: 'Mumbai', lat: 18.9280, lng: 72.8335 },
    tags: ['place', 'walk', 'kala-ghoda', 'art'],
    metadata: { weather: 'Warm, 28°C' }
  },
  {
    id: 'rcpt-018',
    category: 'photo',
    title: 'Photo: "Colonial balcony with overgrown bougainvillea"',
    description: 'Shot on film simulation preset (Fujifilm Classic Chrome).',
    timestamp: '2026-03-21T19:40:00Z',
    location: { name: 'Rampart Row, Kala Ghoda', city: 'Mumbai', lat: 18.9285, lng: 72.8340 },
    tags: ['photo', 'architecture', 'kala-ghoda', 'fujifilm'],
    metadata: { iso: 200, aperture: 'f/2.8' }
  },
  {
    id: 'rcpt-019',
    category: 'music',
    title: 'Played: "Nude" by Radiohead',
    artist: 'Radiohead',
    description: 'Streamed on ear-buds while riding taxi back to Bandra.',
    timestamp: '2026-03-21T20:20:00Z',
    tags: ['music', 'radiohead', 'commute'],
    metadata: { platform: 'Spotify' }
  },

  // --- APRIL 2026: CHAPTER 02 - THE DETOUR & SOUND RECORDINGS ---
  {
    id: 'rcpt-020',
    category: 'purchase',
    title: 'Zoom H4n Pro Field Audio Recorder',
    description: 'Online tech purchase on Amazon India for ambient sound capturing.',
    timestamp: '2026-04-04T11:20:00Z',
    amount: 18900.00,
    tags: ['gear', 'audio', 'sound-design', 'purchase'],
    metadata: { orderId: '408-9821210-112' }
  },
  {
    id: 'rcpt-021',
    category: 'search',
    title: 'Search: "binaural microphone technique field recording tutorials"',
    description: 'Searched on YouTube.',
    timestamp: '2026-04-04T15:00:00Z',
    tags: ['audio', 'tutorial', 'field-recording'],
    metadata: { platform: 'YouTube' }
  },
  {
    id: 'rcpt-022',
    category: 'note',
    title: 'Note: "Project Manifesto: Mapping City Frequencies"',
    description: 'Drafted in Apple Notes: "Every neighborhood has a distinct fundamental resonant frequency. Dadar is 120Hz hum. Marine Drive is 45Hz ocean surge."',
    timestamp: '2026-04-05T01:10:00Z',
    tags: ['manifesto', 'soundscape', 'notes', 'late-night'],
    metadata: { wordCount: 115 }
  },

  {
    id: 'rcpt-023',
    category: 'place',
    title: 'Visited: Sassoon Docks at Dawn',
    description: 'Arrived at 5:15 AM to record early morning fish market chatter and seagull calls.',
    timestamp: '2026-04-11T05:30:00Z',
    location: { name: 'Sassoon Docks, Colaba', city: 'Mumbai', lat: 18.9130, lng: 72.8270 },
    tags: ['place', 'dawn', 'field-recording', 'colaba'],
    metadata: { temperature: '24°C', humidity: '82%' }
  },
  {
    id: 'rcpt-024',
    category: 'photo',
    title: 'Photo: "Blue fishing boats stacked under morning mist"',
    description: 'Raw image taken with 50mm fixed lens.',
    timestamp: '2026-04-11T05:55:00Z',
    location: { name: 'Sassoon Docks', city: 'Mumbai', lat: 18.9130, lng: 72.8270 },
    tags: ['photo', 'dawn', 'docks', 'mumbai'],
    metadata: { shutter: '1/250s', iso: 100 }
  },
  {
    id: 'rcpt-025',
    category: 'purchase',
    title: 'Cutting Chai & Bun Maska at Olympia Coffee House',
    description: 'Cash payment at historic Irani cafe in Colaba.',
    timestamp: '2026-04-11T07:15:00Z',
    amount: 120.00,
    location: { name: 'Olympia Coffee House, Colaba', city: 'Mumbai', lat: 18.9220, lng: 72.8315 },
    tags: ['food', 'chai', 'irani-cafe', 'colaba'],
    metadata: { paymentMethod: 'Cash' }
  },
  {
    id: 'rcpt-026',
    category: 'music',
    title: 'Played: "Music for Airports 1/1" by Brian Eno',
    artist: 'Brian Eno',
    description: 'Listening session while editing morning field recordings.',
    timestamp: '2026-04-11T10:30:00Z',
    tags: ['ambient', 'brian-eno', 'editing', 'field-recording'],
    metadata: { duration: '17:21', platform: 'Spotify' }
  },
  {
    id: 'rcpt-027',
    category: 'message',
    title: 'Message from Kabir: "Did you capture the dock audio? Send the WAV preview!"',
    person: 'Kabir Mehta',
    description: 'Received on WhatsApp.',
    timestamp: '2026-04-11T11:05:00Z',
    tags: ['message', 'kabir', 'audio'],
    metadata: { app: 'WhatsApp' }
  },

  // Late April - Vinyl records & Coffee
  {
    id: 'rcpt-028',
    category: 'place',
    title: 'Visited: Rhythm House Archive / Revolver Club',
    description: 'Browsing vintage vinyl records in Mahim.',
    timestamp: '2026-04-19T16:20:00Z',
    location: { name: 'The Revolver Club, Mahim', city: 'Mumbai', lat: 19.0350, lng: 72.8400 },
    tags: ['place', 'vinyl', 'music', 'mahim'],
    metadata: { durationMinutes: 75 }
  },
  {
    id: 'rcpt-029',
    category: 'purchase',
    title: 'Vinyl Purchase: "Selected Ambient Works 85-92" by Aphex Twin',
    description: 'Original press 180g remaster vinyl.',
    timestamp: '2026-04-19T17:10:00Z',
    amount: 3850.00,
    location: { name: 'The Revolver Club', city: 'Mumbai', lat: 19.0350, lng: 72.8400 },
    tags: ['vinyl', 'aphex-twin', 'purchase', 'music'],
    metadata: { format: '180g 2LP Vinyl' }
  },
  {
    id: 'rcpt-030',
    category: 'search',
    title: 'Search: "turntable preamp ground loop noise fix"',
    description: 'Google search late evening after setting up turntable.',
    timestamp: '2026-04-19T22:45:00Z',
    tags: ['audio', 'hardware', 'turntable', 'tech'],
    metadata: { device: 'iPhone 15 Pro' }
  },
  {
    id: 'rcpt-031',
    category: 'music',
    title: 'Played: "Xtal" by Aphex Twin',
    artist: 'Aphex Twin',
    description: 'First spin on turntable at home.',
    timestamp: '2026-04-19T23:15:00Z',
    tags: ['vinyl', 'aphex-twin', 'home-listening'],
    metadata: { medium: 'Vinyl Record' }
  },

  // --- MAY 2026: CHAPTER 03 - SUMMER EXPLORATION & ESCAPES ---
  {
    id: 'rcpt-032',
    category: 'purchase',
    title: 'IRCTC Train Ticket: Mumbai Central to Alibaug / Mandwa Jetty',
    description: 'Speedboat & ferry ticket for weekend coastal retreat.',
    timestamp: '2026-05-08T09:15:00Z',
    amount: 850.00,
    tags: ['travel', 'ferry', 'alibaug', 'weekend'],
    metadata: { mode: 'Speedboat Mandwa Express' }
  },
  {
    id: 'rcpt-033',
    category: 'place',
    title: 'Visited: Mandwa Jetty & Coastal Promenade',
    description: 'Arrived by boat at Mandwa, coastal breeze.',
    timestamp: '2026-05-09T11:40:00Z',
    location: { name: 'Mandwa Jetty', city: 'Alibaug', lat: 18.7840, lng: 72.8710 },
    tags: ['place', 'coastal', 'travel', 'sea'],
    metadata: { weather: 'Sunny, 32°C' }
  },
  {
    id: 'rcpt-034',
    category: 'photo',
    title: 'Photo: "Sunlight cutting through coconut palm grove"',
    description: 'Overexposed film aesthetic photo taken near Kihim beach.',
    timestamp: '2026-05-09T14:15:00Z',
    location: { name: 'Kihim Beach, Alibaug', city: 'Alibaug', lat: 18.7290, lng: 72.8680 },
    tags: ['photo', 'nature', 'beach', 'summer'],
    photoMood: 'Serene',
    metadata: { iso: 100, aperture: 'f/4.0' }
  },
  {
    id: 'rcpt-035',
    category: 'purchase',
    title: 'Fresh Seafood & Sol Kadhi Lunch',
    description: 'Sanman Restaurant - Alibaug Town.',
    timestamp: '2026-05-09T15:00:00Z',
    amount: 1420.00,
    location: { name: 'Sanman Restaurant', city: 'Alibaug', lat: 18.6410, lng: 72.8720 },
    tags: ['food', 'seafood', 'alibaug', 'lunch'],
    metadata: { paymentMethod: 'Card' }
  },
  {
    id: 'rcpt-036',
    category: 'music',
    title: 'Played: "Aishite Aishite Aishite" / "Floating" by Kiasmos',
    artist: 'Kiasmos',
    description: 'Played on bluetooth portable speaker on sunset beach.',
    timestamp: '2026-05-09T18:50:00Z',
    tags: ['kiasmos', 'electronic', 'sunset', 'beach'],
    metadata: { duration: '5:40', platform: 'Spotify' }
  },
  {
    id: 'rcpt-037',
    category: 'photo',
    title: 'Photo: "Golden hour silhouette against Arabian Sea waves"',
    description: 'Shot taken during low tide.',
    timestamp: '2026-05-09T19:10:00Z',
    location: { name: 'Varsoli Beach', city: 'Alibaug', lat: 18.6550, lng: 72.8650 },
    tags: ['photo', 'sunset', 'sea', 'golden-hour'],
    photoMood: 'Euphoric',
    metadata: { iso: 200, shutter: '1/1000s' }
  },
  {
    id: 'rcpt-038',
    category: 'note',
    title: 'Note: "Field notes: Sound of sea spray vs urban white noise"',
    description: 'Drafted in Apple Notes on coastal train: "Sea waves have a non-periodic fractal decay. Urban traffic has periodic surges. That is why ocean sounds calm human neural rhythms."',
    timestamp: '2026-05-10T20:30:00Z',
    tags: ['notes', 'acoustics', 'sea', 'thoughts'],
    metadata: { wordCount: 68 }
  },

  // Late May - Acoustic Gig & Night drive
  {
    id: 'rcpt-039',
    category: 'event',
    title: 'Attended: "Intimate Acoustic Sessions: Peter Cat Recording Co."',
    description: 'Live performance at The Quarter, Royal Opera House.',
    timestamp: '2026-05-22T20:00:00Z',
    venue: 'Royal Opera House',
    location: { name: 'Royal Opera House, Girgaon', city: 'Mumbai', lat: 18.9560, lng: 72.8160 },
    tags: ['event', 'concert', 'live-music', 'opera-house'],
    metadata: { artist: 'Peter Cat Recording Co.', ticketPrice: 2200 }
  },
  {
    id: 'rcpt-040',
    category: 'purchase',
    title: 'Concert Merch: Vinyl & Printed Poster',
    description: 'Purchased at merch table, Royal Opera House foyer.',
    timestamp: '2026-05-22T22:30:00Z',
    amount: 2500.00,
    location: { name: 'Royal Opera House', city: 'Mumbai', lat: 18.9560, lng: 72.8160 },
    tags: ['merch', 'vinyl', 'concert', 'peter-cat'],
    metadata: { item: 'Bismillah Vinyl + Tour Poster' }
  },
  {
    id: 'rcpt-041',
    category: 'music',
    title: 'Played: "Memory Box" by Peter Cat Recording Co.',
    artist: 'Peter Cat Recording Co.',
    description: 'Listening on repeat in Uber during late night drive across Sea Link.',
    timestamp: '2026-05-22T23:15:00Z',
    tags: ['peter-cat', 'jazz', 'night-drive', 'sea-link'],
    metadata: { duration: '7:42', platform: 'Spotify' }
  },
  {
    id: 'rcpt-042',
    category: 'place',
    title: 'Visited: Bandra-Worli Sea Link Promenade',
    description: 'Night stop at Bandra Fort deck overlooking light arrays.',
    timestamp: '2026-05-22T23:45:00Z',
    location: { name: 'Bandra Fort Deck', city: 'Mumbai', lat: 19.0410, lng: 72.8180 },
    tags: ['place', 'sea-link', 'night-view', 'bandra'],
    metadata: { durationMinutes: 30 }
  },
  {
    id: 'rcpt-043',
    category: 'photo',
    title: 'Photo: "Cable-stayed bridge lights in sea mist"',
    description: 'Long exposure 4-second handheld night photo.',
    timestamp: '2026-05-23T00:05:00Z',
    location: { name: 'Bandra Fort', city: 'Mumbai', lat: 19.0410, lng: 72.8180 },
    tags: ['photo', 'night', 'sea-link', 'long-exposure'],
    photoMood: 'Contemplative',
    metadata: { exposureTime: '4s', iso: 100 }
  },
  {
    id: 'rcpt-044',
    category: 'message',
    title: 'Message to Kabir: "That live arrangement of Memory Box was unreal!"',
    person: 'Kabir Mehta',
    description: 'Sent on iMessage at midnight.',
    timestamp: '2026-05-23T00:20:00Z',
    tags: ['message', 'concert', 'kabir'],
    metadata: { app: 'iMessage' }
  },

  // --- JUNE 2026: CHAPTER 04 - THE COLLABORATION & STUDIO BUILDING ---
  {
    id: 'rcpt-045',
    category: 'search',
    title: 'Search: "how to damp acoustic flutter echo in small studio space"',
    description: 'Google search while sketching studio layout.',
    timestamp: '2026-06-03T16:40:00Z',
    tags: ['studio', 'acoustics', 'diy', 'soundproofing'],
    metadata: { device: 'MacBook Air' }
  },
  {
    id: 'rcpt-046',
    category: 'purchase',
    title: 'Acoustic Foam Panels & Bass Traps (12-pack)',
    description: 'Online purchase from Bajaao.com for home studio setup.',
    timestamp: '2026-06-03T17:15:00Z',
    amount: 6490.00,
    tags: ['purchase', 'studio', 'gear', 'acoustics'],
    metadata: { vendor: 'Bajaao India' }
  },
  {
    id: 'rcpt-047',
    category: 'purchase',
    title: 'IKEA India: Wooden Desk & Cable Management Tray',
    description: 'Card purchase at IKEA Worli City Store.',
    timestamp: '2026-06-05T14:30:00Z',
    amount: 14900.00,
    location: { name: 'IKEA Worli City Store', city: 'Mumbai', lat: 19.0020, lng: 72.8190 },
    tags: ['furniture', 'studio', 'ikea', 'worli'],
    metadata: { orderNo: 'IK-99210' }
  },
  {
    id: 'rcpt-048',
    category: 'photo',
    title: 'Photo: "Empty room before sound panel installation"',
    description: 'Wide-angle room layout photo.',
    timestamp: '2026-06-06T11:00:00Z',
    location: { name: 'Home Studio, Bandra', city: 'Mumbai', lat: 19.0580, lng: 72.8340 },
    tags: ['photo', 'studio', 'workspace', 'setup'],
    photoMood: 'Anticipatory',
    metadata: { lens: '13mm Ultra-Wide' }
  },
  {
    id: 'rcpt-049',
    category: 'event',
    title: 'Studio Build Workshop with Anya & Kabir',
    description: 'All-day collaborative effort putting together desk, mounting acoustic traps, wiring audio interface.',
    timestamp: '2026-06-06T15:00:00Z',
    venue: 'Home Studio',
    location: { name: 'Home Studio, Bandra', city: 'Mumbai', lat: 19.0580, lng: 72.8340 },
    tags: ['event', 'studio', 'diy', 'friends'],
    metadata: { durationHours: 7 }
  },
  {
    id: 'rcpt-050',
    category: 'purchase',
    title: 'Dominos Pizza & Craft Sodas for Studio Helpers',
    description: 'Swiggy order delivered to Bandra studio.',
    timestamp: '2026-06-06T20:15:00Z',
    amount: 1180.00,
    tags: ['food', 'pizza', 'swiggy', 'studio'],
    metadata: { item: '2x Large Feast Pizza' }
  },
  {
    id: 'rcpt-051',
    category: 'photo',
    title: 'Photo: "Warm LED ambient strip glow on freshly acoustic-treated studio desk"',
    description: 'Final setup accomplishment photo.',
    timestamp: '2026-06-06T22:30:00Z',
    location: { name: 'Home Studio, Bandra', city: 'Mumbai', lat: 19.0580, lng: 72.8340 },
    tags: ['photo', 'studio', 'warm-lights', 'accomplishment'],
    photoMood: 'Proud',
    metadata: { iso: 640 }
  },
  {
    id: 'rcpt-052',
    category: 'music',
    title: 'Played: "Resonant Mind (Studio Test Track 01)"',
    artist: 'Self / Field Session',
    description: 'Playback of first binaural test recording in damp room.',
    timestamp: '2026-06-06T23:10:00Z',
    tags: ['music', 'test-recording', 'binaural', 'studio'],
    metadata: { duration: '3:15', format: '24bit 96kHz WAV' }
  },

  // June 14 - MOMENT #07: "An unexpectedly long night"
  {
    id: 'rcpt-053',
    category: 'music',
    title: 'Played: "On the Nature of Daylight" by Max Richter',
    artist: 'Max Richter',
    description: 'Streamed on Spotify at studio desk.',
    timestamp: '2026-06-14T22:12:00Z',
    tags: ['classical', 'strings', 'max-richter', 'night'],
    metadata: { duration: '6:11', platform: 'Spotify' }
  },
  {
    id: 'rcpt-054',
    category: 'purchase',
    title: 'Late Night Ramen & Gyoza at Izumi Bandra',
    description: 'Card payment at Izumi, Bandra West.',
    timestamp: '2026-06-14T22:48:00Z',
    amount: 1850.00,
    location: { name: 'Izumi Bandra', city: 'Mumbai', lat: 19.0630, lng: 72.8350 },
    tags: ['food', 'ramen', 'bandra', 'late-night'],
    metadata: { table: 'Counter Bar 04' }
  },
  {
    id: 'rcpt-055',
    category: 'photo',
    title: 'Photo: "Steaming Tonkotsu ramen bowl under spotlight"',
    description: 'Macro photo of dinner dish.',
    timestamp: '2026-06-14T23:01:00Z',
    location: { name: 'Izumi Bandra', city: 'Mumbai', lat: 19.0630, lng: 72.8350 },
    tags: ['photo', 'ramen', 'food', 'bandra'],
    photoMood: 'Cozy',
    metadata: { iso: 500 }
  },
  {
    id: 'rcpt-056',
    category: 'place',
    title: 'Visited: Carter Road Promenade at Midnight',
    description: 'Night stroll by ocean waves after Izumi ramen.',
    timestamp: '2026-06-14T23:25:00Z',
    location: { name: 'Carter Road Promenade', city: 'Mumbai', lat: 19.0670, lng: 72.8250 },
    tags: ['place', 'sea', 'night-walk', 'carter-road'],
    metadata: { windSpeed: '18km/h', seaCondition: 'High Tide' }
  },
  {
    id: 'rcpt-057',
    category: 'message',
    title: 'Message saved: "Sometimes the city is quietest when the tide is high."',
    person: 'Self / Saved Draft',
    description: 'Saved draft in messages.',
    timestamp: '2026-06-14T23:50:00Z',
    tags: ['message', 'thoughts', 'midnight', 'carter-road'],
    metadata: { folder: 'Saved Messages' }
  },

  // --- JULY 2026: CHAPTER 05 - MONSOON RESONANCE & ARCHIVAL RESEARCH ---
  {
    id: 'rcpt-058',
    category: 'search',
    title: 'Search: "Monsoon rainfall frequency spectrum urban acoustics"',
    description: 'Google Scholar research search.',
    timestamp: '2026-07-02T13:20:00Z',
    tags: ['monsoon', 'research', 'acoustics', 'scholar'],
    metadata: { platform: 'Google Scholar' }
  },
  {
    id: 'rcpt-059',
    category: 'photo',
    title: 'Photo: "Monsoon cloudburst over Bandra skyline"',
    description: 'High contrast photo of monsoon rain curtains over Arabian sea.',
    timestamp: '2026-07-05T16:10:00Z',
    location: { name: 'Bandra Seafront', city: 'Mumbai', lat: 19.0650, lng: 72.8230 },
    tags: ['photo', 'monsoon', 'rain', 'dramatic'],
    photoMood: 'Awe-inspiring',
    metadata: { shutter: '1/1000s', iso: 200 }
  },
  {
    id: 'rcpt-060',
    category: 'music',
    title: 'Played: "Rain" by Ryuichi Sakamoto',
    artist: 'Ryuichi Sakamoto',
    description: 'Listening while watching monsoon rain pour down studio window.',
    timestamp: '2026-07-05T16:30:00Z',
    tags: ['piano', 'sakamoto', 'monsoon', 'rain'],
    metadata: { duration: '3:45', platform: 'Spotify' }
  },
  {
    id: 'rcpt-061',
    category: 'purchase',
    title: 'Vintage Waterproof Audio Mic Windscreen & Rain Shield',
    description: 'Professional outdoor recording gear.',
    timestamp: '2026-07-08T10:45:00Z',
    amount: 3200.00,
    tags: ['gear', 'monsoon', 'audio', 'purchase'],
    metadata: { vendor: 'Sennheiser Authorized Store' }
  },
  {
    id: 'rcpt-062',
    category: 'place',
    title: 'Visited: Asiatic Society Library Steps',
    description: 'Sheltering under neoclassical portico during heavy downpour.',
    timestamp: '2026-07-12T15:30:00Z',
    location: { name: 'Asiatic Society Town Hall', city: 'Mumbai', lat: 18.9320, lng: 72.8360 },
    tags: ['place', 'heritage', 'monsoon', 'library'],
    metadata: { buildingType: 'Neoclassical 1833' }
  },
  {
    id: 'rcpt-063',
    category: 'purchase',
    title: 'Filter Coffee & Masala Dosa at Cafe Madras',
    description: 'Iconic South Indian breakfast spot in Matunga.',
    timestamp: '2026-07-12T17:00:00Z',
    amount: 340.00,
    location: { name: 'Cafe Madras, Matunga', city: 'Mumbai', lat: 19.0270, lng: 72.8540 },
    tags: ['food', 'coffee', 'matunga', 'dosa'],
    metadata: { paymentMethod: 'Cash' }
  },
  {
    id: 'rcpt-064',
    category: 'movie',
    title: 'Watched: "Perfect Days" by Wim Wenders',
    description: 'Watched on MUBI: "The quiet beauty of daily ritual, cassettes, and tree reflections."',
    timestamp: '2026-07-19T21:30:00Z',
    rating: 5,
    tags: ['movie', 'mubi', 'wim-wenders', 'cinema'],
    metadata: { platform: 'MUBI', rating: 5 }
  },
  {
    id: 'rcpt-065',
    category: 'note',
    title: 'Note: "The Anatomy of Daily Rituals"',
    description: 'Inspired by Wenders: "Maybe a life isn\'t measured by breakthroughs, but by the texture of recurring mornings."',
    timestamp: '2026-07-19T23:45:00Z',
    tags: ['notes', 'philosophy', 'rituals', 'reflections'],
    metadata: { wordCount: 88 }
  },

  // --- AUGUST 2026: CHAPTER 06 - THE SYNTHESIS & EXHIBITION ---
  {
    id: 'rcpt-066',
    category: 'search',
    title: 'Search: "gallery space rental Mumbai indie sound installation"',
    description: 'Searching for pop-up exhibition venues.',
    timestamp: '2026-08-01T11:10:00Z',
    tags: ['exhibition', 'gallery', 'mumbai', 'installation'],
    metadata: { device: 'MacBook Air' }
  },
  {
    id: 'rcpt-067',
    category: 'message',
    title: 'Message to Anya: "The venue at Method Bandra is confirmed for August 24!"',
    person: 'Anya Sen',
    description: 'Sent on iMessage with venue contract PDF.',
    timestamp: '2026-08-03T14:20:00Z',
    tags: ['message', 'exhibition', 'anya', 'milestone'],
    metadata: { app: 'iMessage' }
  },
  {
    id: 'rcpt-068',
    category: 'purchase',
    title: 'Gallery Rental Deposit: Method Art Space Bandra',
    description: 'Bank transfer for 3-day sound & photo exhibition space.',
    timestamp: '2026-08-03T15:00:00Z',
    amount: 15000.00,
    location: { name: 'Method Art Space, Bandra', city: 'Mumbai', lat: 19.0610, lng: 72.8330 },
    tags: ['gallery', 'exhibition', 'purchase', 'milestone'],
    metadata: { contractRef: 'MTH-2026-08' }
  },
  {
    id: 'rcpt-069',
    category: 'purchase',
    title: 'Fine Art Archival Prints & Framing (18 pieces)',
    description: 'Printed at Giclée Print Studio, Lower Parel.',
    timestamp: '2026-08-10T16:45:00Z',
    amount: 12400.00,
    location: { name: 'Giclée Print Studio', city: 'Mumbai', lat: 18.9920, lng: 72.8260 },
    tags: ['prints', 'framing', 'art', 'exhibition'],
    metadata: { paper: 'Hahnemühle Photo Rag 308gsm' }
  },
  {
    id: 'rcpt-070',
    category: 'place',
    title: 'Visited: Method Art Space Bandra',
    description: 'Setting up projector, spatial audio speakers, and framed archival photos.',
    timestamp: '2026-08-23T14:00:00Z',
    location: { name: 'Method Art Space, Bandra', city: 'Mumbai', lat: 19.0610, lng: 72.8330 },
    tags: ['place', 'gallery', 'setup', 'exhibition'],
    metadata: { setupHours: 8 }
  },
  {
    id: 'rcpt-071',
    category: 'event',
    title: 'Exhibition Opening: "LIFE IN TRACES: An Urban Soundscape"',
    description: 'Opening night gallery reception. 85 guests attended.',
    timestamp: '2026-08-24T18:30:00Z',
    venue: 'Method Art Space Bandra',
    location: { name: 'Method Art Space, Bandra', city: 'Mumbai', lat: 19.0610, lng: 72.8330 },
    tags: ['event', 'exhibition', 'opening', 'milestone', 'art'],
    metadata: { guestCount: 85, drinksServed: 120 }
  },
  {
    id: 'rcpt-072',
    category: 'photo',
    title: 'Photo: "Crowd gathered around spatial audio listening station"',
    description: 'Opening night candid photo.',
    timestamp: '2026-08-24T20:15:00Z',
    location: { name: 'Method Art Space', city: 'Mumbai', lat: 19.0610, lng: 72.8330 },
    tags: ['photo', 'exhibition', 'crowd', 'celebration'],
    photoMood: 'Triumphant',
    metadata: { iso: 800 }
  },
  {
    id: 'rcpt-073',
    category: 'purchase',
    title: 'Celebration Champagne & Tapas at Subko Specialty Coffee & Crafters',
    description: 'After-party celebration with friends and contributors.',
    timestamp: '2026-08-24T22:30:00Z',
    amount: 4890.00,
    location: { name: 'Subko Coffee, Chapel Road', city: 'Mumbai', lat: 19.0550, lng: 72.8290 },
    tags: ['celebration', 'subko', 'bandra', 'food'],
    metadata: { groupSize: 8 }
  },
  {
    id: 'rcpt-074',
    category: 'music',
    title: 'Played: "Subterranean Homesick Alien" by Radiohead',
    artist: 'Radiohead',
    description: 'Played at home at 2 AM after closing exhibition night - full circle moment.',
    timestamp: '2026-08-25T02:10:00Z',
    tags: ['radiohead', 'full-circle', 'reflection', 'night'],
    metadata: { duration: '4:27', platform: 'Spotify' }
  },
  {
    id: 'rcpt-075',
    category: 'note',
    title: 'Note: "Full Circle: From 2 AM study notes to a room full of listeners"',
    description: 'Final journal entry in Apple Notes: "Six months ago this was just noise in my head. Tonight strangers stood in silence listening to the sea waves recorded at dawn. Traces matter."',
    timestamp: '2026-08-25T02:40:00Z',
    tags: ['reflection', 'milestone', 'full-circle', 'notes'],
    metadata: { wordCount: 74 }
  }
];

// Dynamically generate extra receipts to bring total count to ~180 rich realistic traces across categories
function generateAdditionalTraces(): LifeReceipt[] {
  const categories: LifeReceipt['category'][] = ['music', 'place', 'purchase', 'photo', 'message', 'search', 'movie', 'event', 'note'];
  const locations = [
    { name: 'Subko Specialty Coffee', city: 'Mumbai', lat: 19.0550, lng: 72.8290 },
    { name: 'Marine Drive Promenade', city: 'Mumbai', lat: 18.9430, lng: 72.8230 },
    { name: 'Title Waves Bookstore', city: 'Mumbai', lat: 19.0590, lng: 72.8320 },
    { name: 'Prithvi Theatre Cafe', city: 'Mumbai', lat: 19.1060, lng: 72.8260 },
    { name: 'Bonobo Rooftop', city: 'Mumbai', lat: 19.0670, lng: 72.8340 },
    { name: 'Chhatrapati Shivaji Terminus', city: 'Mumbai', lat: 18.9400, lng: 72.8350 }
  ];

  const musicTracks = [
    { title: 'Played: "Track 10" by Charli XCX', artist: 'Charli XCX' },
    { title: 'Played: "Teardrop" by Massive Attack', artist: 'Massive Attack' },
    { title: 'Played: "Windowlicker" by Aphex Twin', artist: 'Aphex Twin' },
    { title: 'Played: "In Rainbows" by Radiohead', artist: 'Radiohead' },
    { title: 'Played: "Midnight City" by M83', artist: 'M83' },
    { title: 'Played: "Holocene" by Bon Iver', artist: 'Bon Iver' },
    { title: 'Played: "Contact" by Daft Punk', artist: 'Daft Punk' }
  ];

  const extra: LifeReceipt[] = [];
  let idCounter = 76;

  const startDate = new Date('2026-03-01T00:00:00Z').getTime();
  const endDate = new Date('2026-08-30T00:00:00Z').getTime();

  for (let i = 0; i < 115; i++) {
    const timeMs = startDate + Math.random() * (endDate - startDate);
    const dateObj = new Date(timeMs);
    const isoString = dateObj.toISOString();
    const hour = dateObj.getHours();

    const cat = categories[i % categories.length];
    const loc = locations[i % locations.length];

    if (cat === 'music') {
      const track = musicTracks[i % musicTracks.length];
      extra.push({
        id: `rcpt-${String(idCounter++).padStart(3, '0')}`,
        category: 'music',
        title: track.title,
        artist: track.artist,
        description: `Streamed on Spotify (${hour > 22 || hour < 5 ? 'Late night listening' : 'Daytime play'})`,
        timestamp: isoString,
        tags: ['music', track.artist.toLowerCase().replace(/\s+/g, '-'), hour > 22 || hour < 5 ? 'late-night' : 'daily'],
        metadata: { platform: 'Spotify', hourOfDay: hour }
      });
    } else if (cat === 'purchase') {
      const items = ['Espresso & Croissant', 'Book: Architectural Detail', 'Uber Ride to Bandra', 'Film Roll 35mm', 'Stationery & Notebook', 'Matcha Latte'];
      const amounts = [320, 1250, 450, 890, 650, 420];
      const idx = i % items.length;
      extra.push({
        id: `rcpt-${String(idCounter++).padStart(3, '0')}`,
        category: 'purchase',
        title: items[idx],
        description: `Payment via UPI / Card at ${loc.name}`,
        timestamp: isoString,
        amount: amounts[idx],
        location: loc,
        tags: ['purchase', idx === 2 ? 'commute' : 'lifestyle'],
        metadata: { paymentMethod: 'Contactless Card' }
      });
    } else if (cat === 'place') {
      extra.push({
        id: `rcpt-${String(idCounter++).padStart(3, '0')}`,
        category: 'place',
        title: `Checked in: ${loc.name}`,
        description: `Location ping near ${loc.city}.`,
        timestamp: isoString,
        location: loc,
        tags: ['place', loc.name.toLowerCase().includes('coffee') ? 'coffee' : 'urban'],
        metadata: { accuracyMeters: 12 }
      });
    } else if (cat === 'photo') {
      const titles = ['Photo: Street reflection after rain', 'Photo: Bookshelf in shadow', 'Photo: Sunset sky gradient', 'Photo: Coffee cup with notebook', 'Photo: Architecture detail facade'];
      extra.push({
        id: `rcpt-${String(idCounter++).padStart(3, '0')}`,
        category: 'photo',
        title: titles[i % titles.length],
        description: 'Shot on iPhone 15 Pro, edited in Lightroom.',
        timestamp: isoString,
        location: loc,
        tags: ['photo', 'aesthetic', 'journal'],
        photoMood: i % 2 === 0 ? 'Serene' : 'Thoughtful',
        metadata: { iso: 200, format: 'HEIC' }
      });
    } else if (cat === 'search') {
      const queries = ['best acoustic panel layout', 'monsoon photography tips', 'minimalist typography design', 'vintage synth analog sounds', 'mumbai indie art spaces'];
      extra.push({
        id: `rcpt-${String(idCounter++).padStart(3, '0')}`,
        category: 'search',
        title: `Search: "${queries[i % queries.length]}"`,
        description: 'Google search from mobile browser.',
        timestamp: isoString,
        tags: ['search', 'curiosity', 'research'],
        metadata: { device: 'Mobile Safari' }
      });
    } else if (cat === 'message') {
      const msgs = ['"Hey, meeting at the usual spot?"', '"Check out this new track!"', '"Did you read the article on urban soundscapes?"', '"Let\'s catch up this weekend!"'];
      const people = ['Anya Sen', 'Kabir Mehta', 'Rohan Verma', 'Maya Kapoor'];
      extra.push({
        id: `rcpt-${String(idCounter++).padStart(3, '0')}`,
        category: 'message',
        title: `Message with ${people[i % people.length]}`,
        person: people[i % people.length],
        description: msgs[i % msgs.length],
        timestamp: isoString,
        tags: ['message', 'chat', 'friends'],
        metadata: { app: 'iMessage' }
      });
    } else if (cat === 'event') {
      extra.push({
        id: `rcpt-${String(idCounter++).padStart(3, '0')}`,
        category: 'event',
        title: `Event: ${i % 2 === 0 ? 'Indie Film Screening' : 'Design & Tech Meetup'}`,
        venue: loc.name,
        timestamp: isoString,
        location: loc,
        tags: ['event', 'community', 'culture'],
        metadata: { rsvp: 'Attended' }
      });
    } else if (cat === 'movie') {
      extra.push({
        id: `rcpt-${String(idCounter++).padStart(3, '0')}`,
        category: 'movie',
        title: `Watched: ${i % 2 === 0 ? 'Drive My Car' : 'Her'}`,
        description: 'Logged on Letterboxd.',
        timestamp: isoString,
        rating: 4,
        tags: ['movie', 'letterboxd'],
        metadata: { rating: 4 }
      });
    } else {
      extra.push({
        id: `rcpt-${String(idCounter++).padStart(3, '0')}`,
        category: 'note',
        title: `Note: ${i % 2 === 0 ? 'Observation on ambient light' : 'Ideas for new audio project'}`,
        description: 'Quick draft in notes app.',
        timestamp: isoString,
        tags: ['note', 'journal', 'creative'],
        metadata: { wordCount: 35 }
      });
    }
  }

  return extra;
}

export const ALL_RECEIPTS: LifeReceipt[] = [
  ...MOCK_RECEIPTS,
  ...generateAdditionalTraces()
].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
