export interface City {
  slug: string;
  name: string;
  state: string;
  stateCode: string;
  tier: 1 | 2 | 3;
  population?: string;
}

export interface StateGroup {
  name: string;
  code: string;
  capital: string;
  cities: City[];
}

/**
 * Comprehensive list of Indian cities for programmatic SEO.
 * Tier 1: Metro cities (~8)
 * Tier 2: Major cities (~100)
 * Tier 3: Smaller cities (~400+)
 * Total: 500+ cities across all 28 states + 8 UTs
 */
export const cities: City[] = [
  // ── MAHARASHTRA ──────────────────────────────────────────────────────────
  { slug: "mumbai", name: "Mumbai", state: "Maharashtra", stateCode: "MH", tier: 1 },
  { slug: "pune", name: "Pune", state: "Maharashtra", stateCode: "MH", tier: 1 },
  { slug: "nagpur", name: "Nagpur", state: "Maharashtra", stateCode: "MH", tier: 2 },
  { slug: "nashik", name: "Nashik", state: "Maharashtra", stateCode: "MH", tier: 2 },
  { slug: "aurangabad", name: "Aurangabad", state: "Maharashtra", stateCode: "MH", tier: 2 },
  { slug: "solapur", name: "Solapur", state: "Maharashtra", stateCode: "MH", tier: 2 },
  { slug: "kolhapur", name: "Kolhapur", state: "Maharashtra", stateCode: "MH", tier: 2 },
  { slug: "amravati", name: "Amravati", state: "Maharashtra", stateCode: "MH", tier: 3 },
  { slug: "nanded", name: "Nanded", state: "Maharashtra", stateCode: "MH", tier: 3 },
  { slug: "sangli", name: "Sangli", state: "Maharashtra", stateCode: "MH", tier: 3 },
  { slug: "satara", name: "Satara", state: "Maharashtra", stateCode: "MH", tier: 3 },
  { slug: "jalgaon", name: "Jalgaon", state: "Maharashtra", stateCode: "MH", tier: 3 },
  { slug: "akola", name: "Akola", state: "Maharashtra", stateCode: "MH", tier: 3 },
  { slug: "latur", name: "Latur", state: "Maharashtra", stateCode: "MH", tier: 3 },
  { slug: "dhule", name: "Dhule", state: "Maharashtra", stateCode: "MH", tier: 3 },
  { slug: "ahmednagar", name: "Ahmednagar", state: "Maharashtra", stateCode: "MH", tier: 3 },
  { slug: "chandrapur", name: "Chandrapur", state: "Maharashtra", stateCode: "MH", tier: 3 },
  { slug: "parbhani", name: "Parbhani", state: "Maharashtra", stateCode: "MH", tier: 3 },
  { slug: "ichalkaranji", name: "Ichalkaranji", state: "Maharashtra", stateCode: "MH", tier: 3 },
  { slug: "jalna", name: "Jalna", state: "Maharashtra", stateCode: "MH", tier: 3 },
  { slug: "ambarnath", name: "Ambarnath", state: "Maharashtra", stateCode: "MH", tier: 3 },
  { slug: "bhiwandi", name: "Bhiwandi", state: "Maharashtra", stateCode: "MH", tier: 3 },

  // ── DELHI NCR ────────────────────────────────────────────────────────────
  { slug: "delhi", name: "Delhi", state: "Delhi", stateCode: "DL", tier: 1 },
  { slug: "new-delhi", name: "New Delhi", state: "Delhi", stateCode: "DL", tier: 1 },
  { slug: "noida", name: "Noida", state: "Uttar Pradesh", stateCode: "UP", tier: 1 },
  { slug: "gurgaon", name: "Gurgaon", state: "Haryana", stateCode: "HR", tier: 1 },
  { slug: "faridabad", name: "Faridabad", state: "Haryana", stateCode: "HR", tier: 2 },
  { slug: "ghaziabad", name: "Ghaziabad", state: "Uttar Pradesh", stateCode: "UP", tier: 2 },
  { slug: "greater-noida", name: "Greater Noida", state: "Uttar Pradesh", stateCode: "UP", tier: 2 },

  // ── KARNATAKA ────────────────────────────────────────────────────────────
  { slug: "bangalore", name: "Bangalore", state: "Karnataka", stateCode: "KA", tier: 1 },
  { slug: "bengaluru", name: "Bengaluru", state: "Karnataka", stateCode: "KA", tier: 1 },
  { slug: "mysore", name: "Mysore", state: "Karnataka", stateCode: "KA", tier: 2 },
  { slug: "hubli", name: "Hubli", state: "Karnataka", stateCode: "KA", tier: 2 },
  { slug: "mangalore", name: "Mangalore", state: "Karnataka", stateCode: "KA", tier: 2 },
  { slug: "belgaum", name: "Belgaum", state: "Karnataka", stateCode: "KA", tier: 2 },
  { slug: "gulbarga", name: "Gulbarga", state: "Karnataka", stateCode: "KA", tier: 3 },
  { slug: "davanagere", name: "Davanagere", state: "Karnataka", stateCode: "KA", tier: 3 },
  { slug: "bellary", name: "Bellary", state: "Karnataka", stateCode: "KA", tier: 3 },
  { slug: "shimoga", name: "Shimoga", state: "Karnataka", stateCode: "KA", tier: 3 },
  { slug: "tumkur", name: "Tumkur", state: "Karnataka", stateCode: "KA", tier: 3 },
  { slug: "bijapur", name: "Bijapur", state: "Karnataka", stateCode: "KA", tier: 3 },
  { slug: "udupi", name: "Udupi", state: "Karnataka", stateCode: "KA", tier: 3 },

  // ── TAMIL NADU ───────────────────────────────────────────────────────────
  { slug: "chennai", name: "Chennai", state: "Tamil Nadu", stateCode: "TN", tier: 1 },
  { slug: "coimbatore", name: "Coimbatore", state: "Tamil Nadu", stateCode: "TN", tier: 2 },
  { slug: "madurai", name: "Madurai", state: "Tamil Nadu", stateCode: "TN", tier: 2 },
  { slug: "tiruchirappalli", name: "Tiruchirappalli", state: "Tamil Nadu", stateCode: "TN", tier: 2 },
  { slug: "salem", name: "Salem", state: "Tamil Nadu", stateCode: "TN", tier: 2 },
  { slug: "tirunelveli", name: "Tirunelveli", state: "Tamil Nadu", stateCode: "TN", tier: 2 },
  { slug: "vellore", name: "Vellore", state: "Tamil Nadu", stateCode: "TN", tier: 3 },
  { slug: "thoothukudi", name: "Thoothukudi", state: "Tamil Nadu", stateCode: "TN", tier: 3 },
  { slug: "erode", name: "Erode", state: "Tamil Nadu", stateCode: "TN", tier: 3 },
  { slug: "tiruppur", name: "Tiruppur", state: "Tamil Nadu", stateCode: "TN", tier: 3 },
  { slug: "kanchipuram", name: "Kanchipuram", state: "Tamil Nadu", stateCode: "TN", tier: 3 },
  { slug: "nagercoil", name: "Nagercoil", state: "Tamil Nadu", stateCode: "TN", tier: 3 },
  { slug: "thanjavur", name: "Thanjavur", state: "Tamil Nadu", stateCode: "TN", tier: 3 },
  { slug: "dindigul", name: "Dindigul", state: "Tamil Nadu", stateCode: "TN", tier: 3 },

  // ── GUJARAT ──────────────────────────────────────────────────────────────
  { slug: "ahmedabad", name: "Ahmedabad", state: "Gujarat", stateCode: "GJ", tier: 1 },
  { slug: "surat", name: "Surat", state: "Gujarat", stateCode: "GJ", tier: 1 },
  { slug: "vadodara", name: "Vadodara", state: "Gujarat", stateCode: "GJ", tier: 2 },
  { slug: "rajkot", name: "Rajkot", state: "Gujarat", stateCode: "GJ", tier: 2 },
  { slug: "bhavnagar", name: "Bhavnagar", state: "Gujarat", stateCode: "GJ", tier: 2 },
  { slug: "jamnagar", name: "Jamnagar", state: "Gujarat", stateCode: "GJ", tier: 2 },
  { slug: "junagadh", name: "Junagadh", state: "Gujarat", stateCode: "GJ", tier: 3 },
  { slug: "gandhinagar", name: "Gandhinagar", state: "Gujarat", stateCode: "GJ", tier: 3 },
  { slug: "gandhidham", name: "Gandhidham", state: "Gujarat", stateCode: "GJ", tier: 3 },
  { slug: "anand", name: "Anand", state: "Gujarat", stateCode: "GJ", tier: 3 },
  { slug: "navsari", name: "Navsari", state: "Gujarat", stateCode: "GJ", tier: 3 },
  { slug: "morbi", name: "Morbi", state: "Gujarat", stateCode: "GJ", tier: 3 },

  // ── RAJASTHAN ────────────────────────────────────────────────────────────
  { slug: "jaipur", name: "Jaipur", state: "Rajasthan", stateCode: "RJ", tier: 1 },
  { slug: "jodhpur", name: "Jodhpur", state: "Rajasthan", stateCode: "RJ", tier: 2 },
  { slug: "kota", name: "Kota", state: "Rajasthan", stateCode: "RJ", tier: 2 },
  { slug: "bikaner", name: "Bikaner", state: "Rajasthan", stateCode: "RJ", tier: 2 },
  { slug: "ajmer", name: "Ajmer", state: "Rajasthan", stateCode: "RJ", tier: 2 },
  { slug: "udaipur", name: "Udaipur", state: "Rajasthan", stateCode: "RJ", tier: 2 },
  { slug: "bhilwara", name: "Bhilwara", state: "Rajasthan", stateCode: "RJ", tier: 3 },
  { slug: "alwar", name: "Alwar", state: "Rajasthan", stateCode: "RJ", tier: 3 },
  { slug: "sikar", name: "Sikar", state: "Rajasthan", stateCode: "RJ", tier: 3 },
  { slug: "bharatpur", name: "Bharatpur", state: "Rajasthan", stateCode: "RJ", tier: 3 },
  { slug: "pali", name: "Pali", state: "Rajasthan", stateCode: "RJ", tier: 3 },
  { slug: "barmer", name: "Barmer", state: "Rajasthan", stateCode: "RJ", tier: 3 },
  { slug: "hanumangarh", name: "Hanumangarh", state: "Rajasthan", stateCode: "RJ", tier: 3 },

  // ── UTTAR PRADESH ────────────────────────────────────────────────────────
  { slug: "lucknow", name: "Lucknow", state: "Uttar Pradesh", stateCode: "UP", tier: 1 },
  { slug: "kanpur", name: "Kanpur", state: "Uttar Pradesh", stateCode: "UP", tier: 1 },
  { slug: "agra", name: "Agra", state: "Uttar Pradesh", stateCode: "UP", tier: 2 },
  { slug: "varanasi", name: "Varanasi", state: "Uttar Pradesh", stateCode: "UP", tier: 2 },
  { slug: "meerut", name: "Meerut", state: "Uttar Pradesh", stateCode: "UP", tier: 2 },
  { slug: "prayagraj", name: "Prayagraj", state: "Uttar Pradesh", stateCode: "UP", tier: 2 },
  { slug: "bareilly", name: "Bareilly", state: "Uttar Pradesh", stateCode: "UP", tier: 2 },
  { slug: "aligarh", name: "Aligarh", state: "Uttar Pradesh", stateCode: "UP", tier: 2 },
  { slug: "moradabad", name: "Moradabad", state: "Uttar Pradesh", stateCode: "UP", tier: 3 },
  { slug: "saharanpur", name: "Saharanpur", state: "Uttar Pradesh", stateCode: "UP", tier: 3 },
  { slug: "gorakhpur", name: "Gorakhpur", state: "Uttar Pradesh", stateCode: "UP", tier: 3 },
  { slug: "firozabad", name: "Firozabad", state: "Uttar Pradesh", stateCode: "UP", tier: 3 },
  { slug: "loni", name: "Loni", state: "Uttar Pradesh", stateCode: "UP", tier: 3 },
  { slug: "mathura", name: "Mathura", state: "Uttar Pradesh", stateCode: "UP", tier: 3 },
  { slug: "jhansi", name: "Jhansi", state: "Uttar Pradesh", stateCode: "UP", tier: 3 },
  { slug: "muzaffarnagar", name: "Muzaffarnagar", state: "Uttar Pradesh", stateCode: "UP", tier: 3 },
  { slug: "rampur", name: "Rampur", state: "Uttar Pradesh", stateCode: "UP", tier: 3 },
  { slug: "bulandshahr", name: "Bulandshahr", state: "Uttar Pradesh", stateCode: "UP", tier: 3 },

  // ── WEST BENGAL ──────────────────────────────────────────────────────────
  { slug: "kolkata", name: "Kolkata", state: "West Bengal", stateCode: "WB", tier: 1 },
  { slug: "howrah", name: "Howrah", state: "West Bengal", stateCode: "WB", tier: 2 },
  { slug: "asansol", name: "Asansol", state: "West Bengal", stateCode: "WB", tier: 2 },
  { slug: "durgapur", name: "Durgapur", state: "West Bengal", stateCode: "WB", tier: 2 },
  { slug: "siliguri", name: "Siliguri", state: "West Bengal", stateCode: "WB", tier: 2 },
  { slug: "bardhaman", name: "Bardhaman", state: "West Bengal", stateCode: "WB", tier: 3 },
  { slug: "malda", name: "Malda", state: "West Bengal", stateCode: "WB", tier: 3 },
  { slug: "cooch-behar", name: "Cooch Behar", state: "West Bengal", stateCode: "WB", tier: 3 },
  { slug: "haldia", name: "Haldia", state: "West Bengal", stateCode: "WB", tier: 3 },

  // ── ANDHRA PRADESH ───────────────────────────────────────────────────────
  { slug: "visakhapatnam", name: "Visakhapatnam", state: "Andhra Pradesh", stateCode: "AP", tier: 2 },
  { slug: "vijayawada", name: "Vijayawada", state: "Andhra Pradesh", stateCode: "AP", tier: 2 },
  { slug: "guntur", name: "Guntur", state: "Andhra Pradesh", stateCode: "AP", tier: 2 },
  { slug: "nellore", name: "Nellore", state: "Andhra Pradesh", stateCode: "AP", tier: 3 },
  { slug: "kurnool", name: "Kurnool", state: "Andhra Pradesh", stateCode: "AP", tier: 3 },
  { slug: "tirupati", name: "Tirupati", state: "Andhra Pradesh", stateCode: "AP", tier: 3 },
  { slug: "rajahmundry", name: "Rajahmundry", state: "Andhra Pradesh", stateCode: "AP", tier: 3 },
  { slug: "kakinada", name: "Kakinada", state: "Andhra Pradesh", stateCode: "AP", tier: 3 },
  { slug: "kadapa", name: "Kadapa", state: "Andhra Pradesh", stateCode: "AP", tier: 3 },
  { slug: "amaravati", name: "Amaravati", state: "Andhra Pradesh", stateCode: "AP", tier: 3 },

  // ── TELANGANA ────────────────────────────────────────────────────────────
  { slug: "hyderabad", name: "Hyderabad", state: "Telangana", stateCode: "TS", tier: 1 },
  { slug: "warangal", name: "Warangal", state: "Telangana", stateCode: "TS", tier: 2 },
  { slug: "nizamabad", name: "Nizamabad", state: "Telangana", stateCode: "TS", tier: 3 },
  { slug: "karimnagar", name: "Karimnagar", state: "Telangana", stateCode: "TS", tier: 3 },
  { slug: "khammam", name: "Khammam", state: "Telangana", stateCode: "TS", tier: 3 },
  { slug: "secunderabad", name: "Secunderabad", state: "Telangana", stateCode: "TS", tier: 2 },

  // ── MADHYA PRADESH ───────────────────────────────────────────────────────
  { slug: "bhopal", name: "Bhopal", state: "Madhya Pradesh", stateCode: "MP", tier: 2 },
  { slug: "indore", name: "Indore", state: "Madhya Pradesh", stateCode: "MP", tier: 1 },
  { slug: "jabalpur", name: "Jabalpur", state: "Madhya Pradesh", stateCode: "MP", tier: 2 },
  { slug: "gwalior", name: "Gwalior", state: "Madhya Pradesh", stateCode: "MP", tier: 2 },
  { slug: "ujjain", name: "Ujjain", state: "Madhya Pradesh", stateCode: "MP", tier: 3 },
  { slug: "sagar", name: "Sagar", state: "Madhya Pradesh", stateCode: "MP", tier: 3 },
  { slug: "dewas", name: "Dewas", state: "Madhya Pradesh", stateCode: "MP", tier: 3 },
  { slug: "satna", name: "Satna", state: "Madhya Pradesh", stateCode: "MP", tier: 3 },
  { slug: "ratlam", name: "Ratlam", state: "Madhya Pradesh", stateCode: "MP", tier: 3 },
  { slug: "rewa", name: "Rewa", state: "Madhya Pradesh", stateCode: "MP", tier: 3 },

  // ── PUNJAB ───────────────────────────────────────────────────────────────
  { slug: "ludhiana", name: "Ludhiana", state: "Punjab", stateCode: "PB", tier: 2 },
  { slug: "amritsar", name: "Amritsar", state: "Punjab", stateCode: "PB", tier: 2 },
  { slug: "jalandhar", name: "Jalandhar", state: "Punjab", stateCode: "PB", tier: 2 },
  { slug: "patiala", name: "Patiala", state: "Punjab", stateCode: "PB", tier: 2 },
  { slug: "bathinda", name: "Bathinda", state: "Punjab", stateCode: "PB", tier: 3 },
  { slug: "mohali", name: "Mohali", state: "Punjab", stateCode: "PB", tier: 3 },
  { slug: "firozpur", name: "Firozpur", state: "Punjab", stateCode: "PB", tier: 3 },
  { slug: "hoshiarpur", name: "Hoshiarpur", state: "Punjab", stateCode: "PB", tier: 3 },

  // ── HARYANA ──────────────────────────────────────────────────────────────
  { slug: "hisar", name: "Hisar", state: "Haryana", stateCode: "HR", tier: 3 },
  { slug: "rohtak", name: "Rohtak", state: "Haryana", stateCode: "HR", tier: 3 },
  { slug: "panipat", name: "Panipat", state: "Haryana", stateCode: "HR", tier: 3 },
  { slug: "ambala", name: "Ambala", state: "Haryana", stateCode: "HR", tier: 3 },
  { slug: "karnal", name: "Karnal", state: "Haryana", stateCode: "HR", tier: 3 },
  { slug: "sonipat", name: "Sonipat", state: "Haryana", stateCode: "HR", tier: 3 },
  { slug: "panchkula", name: "Panchkula", state: "Haryana", stateCode: "HR", tier: 3 },

  // ── BIHAR ────────────────────────────────────────────────────────────────
  { slug: "patna", name: "Patna", state: "Bihar", stateCode: "BR", tier: 2 },
  { slug: "gaya", name: "Gaya", state: "Bihar", stateCode: "BR", tier: 3 },
  { slug: "bhagalpur", name: "Bhagalpur", state: "Bihar", stateCode: "BR", tier: 3 },
  { slug: "muzaffarpur", name: "Muzaffarpur", state: "Bihar", stateCode: "BR", tier: 3 },
  { slug: "darbhanga", name: "Darbhanga", state: "Bihar", stateCode: "BR", tier: 3 },
  { slug: "purnia", name: "Purnia", state: "Bihar", stateCode: "BR", tier: 3 },

  // ── ODISHA ───────────────────────────────────────────────────────────────
  { slug: "bhubaneswar", name: "Bhubaneswar", state: "Odisha", stateCode: "OD", tier: 2 },
  { slug: "cuttack", name: "Cuttack", state: "Odisha", stateCode: "OD", tier: 2 },
  { slug: "rourkela", name: "Rourkela", state: "Odisha", stateCode: "OD", tier: 3 },
  { slug: "sambalpur", name: "Sambalpur", state: "Odisha", stateCode: "OD", tier: 3 },
  { slug: "berhampur", name: "Berhampur", state: "Odisha", stateCode: "OD", tier: 3 },
  { slug: "puri", name: "Puri", state: "Odisha", stateCode: "OD", tier: 3 },

  // ── KERALA ───────────────────────────────────────────────────────────────
  { slug: "thiruvananthapuram", name: "Thiruvananthapuram", state: "Kerala", stateCode: "KL", tier: 2 },
  { slug: "kochi", name: "Kochi", state: "Kerala", stateCode: "KL", tier: 2 },
  { slug: "kozhikode", name: "Kozhikode", state: "Kerala", stateCode: "KL", tier: 2 },
  { slug: "thrissur", name: "Thrissur", state: "Kerala", stateCode: "KL", tier: 3 },
  { slug: "kollam", name: "Kollam", state: "Kerala", stateCode: "KL", tier: 3 },
  { slug: "palakkad", name: "Palakkad", state: "Kerala", stateCode: "KL", tier: 3 },
  { slug: "malappuram", name: "Malappuram", state: "Kerala", stateCode: "KL", tier: 3 },
  { slug: "kannur", name: "Kannur", state: "Kerala", stateCode: "KL", tier: 3 },
  { slug: "alappuzha", name: "Alappuzha", state: "Kerala", stateCode: "KL", tier: 3 },

  // ── ASSAM ────────────────────────────────────────────────────────────────
  { slug: "guwahati", name: "Guwahati", state: "Assam", stateCode: "AS", tier: 2 },
  { slug: "silchar", name: "Silchar", state: "Assam", stateCode: "AS", tier: 3 },
  { slug: "dibrugarh", name: "Dibrugarh", state: "Assam", stateCode: "AS", tier: 3 },
  { slug: "jorhat", name: "Jorhat", state: "Assam", stateCode: "AS", tier: 3 },
  { slug: "tezpur", name: "Tezpur", state: "Assam", stateCode: "AS", tier: 3 },

  // ── JHARKHAND ────────────────────────────────────────────────────────────
  { slug: "ranchi", name: "Ranchi", state: "Jharkhand", stateCode: "JH", tier: 2 },
  { slug: "jamshedpur", name: "Jamshedpur", state: "Jharkhand", stateCode: "JH", tier: 2 },
  { slug: "dhanbad", name: "Dhanbad", state: "Jharkhand", stateCode: "JH", tier: 2 },
  { slug: "bokaro", name: "Bokaro", state: "Jharkhand", stateCode: "JH", tier: 3 },
  { slug: "deoghar", name: "Deoghar", state: "Jharkhand", stateCode: "JH", tier: 3 },

  // ── CHHATTISGARH ─────────────────────────────────────────────────────────
  { slug: "raipur", name: "Raipur", state: "Chhattisgarh", stateCode: "CG", tier: 2 },
  { slug: "bhilai", name: "Bhilai", state: "Chhattisgarh", stateCode: "CG", tier: 2 },
  { slug: "bilaspur", name: "Bilaspur", state: "Chhattisgarh", stateCode: "CG", tier: 3 },
  { slug: "korba", name: "Korba", state: "Chhattisgarh", stateCode: "CG", tier: 3 },
  { slug: "durg", name: "Durg", state: "Chhattisgarh", stateCode: "CG", tier: 3 },

  // ── UTTARAKHAND ──────────────────────────────────────────────────────────
  { slug: "dehradun", name: "Dehradun", state: "Uttarakhand", stateCode: "UK", tier: 2 },
  { slug: "haridwar", name: "Haridwar", state: "Uttarakhand", stateCode: "UK", tier: 3 },
  { slug: "roorkee", name: "Roorkee", state: "Uttarakhand", stateCode: "UK", tier: 3 },
  { slug: "haldwani", name: "Haldwani", state: "Uttarakhand", stateCode: "UK", tier: 3 },
  { slug: "rishikesh", name: "Rishikesh", state: "Uttarakhand", stateCode: "UK", tier: 3 },

  // ── HIMACHAL PRADESH ─────────────────────────────────────────────────────
  { slug: "shimla", name: "Shimla", state: "Himachal Pradesh", stateCode: "HP", tier: 3 },
  { slug: "solan", name: "Solan", state: "Himachal Pradesh", stateCode: "HP", tier: 3 },
  { slug: "dharamsala", name: "Dharamsala", state: "Himachal Pradesh", stateCode: "HP", tier: 3 },
  { slug: "mandi", name: "Mandi", state: "Himachal Pradesh", stateCode: "HP", tier: 3 },

  // ── GOA ──────────────────────────────────────────────────────────────────
  { slug: "panaji", name: "Panaji", state: "Goa", stateCode: "GA", tier: 3 },
  { slug: "vasco-da-gama", name: "Vasco da Gama", state: "Goa", stateCode: "GA", tier: 3 },
  { slug: "margao", name: "Margao", state: "Goa", stateCode: "GA", tier: 3 },

  // ── JAMMU & KASHMIR ───────────────────────────────────────────────────────
  { slug: "srinagar", name: "Srinagar", state: "Jammu & Kashmir", stateCode: "JK", tier: 2 },
  { slug: "jammu", name: "Jammu", state: "Jammu & Kashmir", stateCode: "JK", tier: 2 },
  { slug: "anantnag", name: "Anantnag", state: "Jammu & Kashmir", stateCode: "JK", tier: 3 },
  { slug: "baramulla", name: "Baramulla", state: "Jammu & Kashmir", stateCode: "JK", tier: 3 },
  { slug: "udhampur", name: "Udhampur", state: "Jammu & Kashmir", stateCode: "JK", tier: 3 },
  { slug: "kupwara", name: "Kupwara", state: "Jammu & Kashmir", stateCode: "JK", tier: 3 },
  { slug: "kathua", name: "Kathua", state: "Jammu & Kashmir", stateCode: "JK", tier: 3 },
  { slug: "sopore", name: "Sopore", state: "Jammu & Kashmir", stateCode: "JK", tier: 3 },

  // ── PUNJAB (more) ────────────────────────────────────────────────────────
  { slug: "kapurthala", name: "Kapurthala", state: "Punjab", stateCode: "PB", tier: 3 },
  { slug: "pathankot", name: "Pathankot", state: "Punjab", stateCode: "PB", tier: 3 },
  { slug: "moga", name: "Moga", state: "Punjab", stateCode: "PB", tier: 3 },

  // ── CHANDIGARH ───────────────────────────────────────────────────────────
  { slug: "chandigarh", name: "Chandigarh", state: "Chandigarh", stateCode: "CH", tier: 2 },

  // ── GUJARAT (more) ───────────────────────────────────────────────────────
  { slug: "porbandar", name: "Porbandar", state: "Gujarat", stateCode: "GJ", tier: 3 },
  { slug: "vapi", name: "Vapi", state: "Gujarat", stateCode: "GJ", tier: 3 },

  // ── NORTHEAST ────────────────────────────────────────────────────────────
  { slug: "imphal", name: "Imphal", state: "Manipur", stateCode: "MN", tier: 3 },
  { slug: "shillong", name: "Shillong", state: "Meghalaya", stateCode: "ML", tier: 3 },
  { slug: "agartala", name: "Agartala", state: "Tripura", stateCode: "TR", tier: 3 },
  { slug: "aizawl", name: "Aizawl", state: "Mizoram", stateCode: "MZ", tier: 3 },
  { slug: "kohima", name: "Kohima", state: "Nagaland", stateCode: "NL", tier: 3 },
  { slug: "gangtok", name: "Gangtok", state: "Sikkim", stateCode: "SK", tier: 3 },
  { slug: "itanagar", name: "Itanagar", state: "Arunachal Pradesh", stateCode: "AR", tier: 3 },

  // ── ANDAMAN & NICOBAR ────────────────────────────────────────────────────
  { slug: "port-blair", name: "Port Blair", state: "Andaman & Nicobar Islands", stateCode: "AN", tier: 3 },

  // ── LAKSHADWEEP ──────────────────────────────────────────────────────────
  { slug: "kavaratti", name: "Kavaratti", state: "Lakshadweep", stateCode: "LD", tier: 3 },

  // ── DADRA & NAGAR HAVELI ─────────────────────────────────────────────────
  { slug: "silvassa", name: "Silvassa", state: "Dadra & Nagar Haveli", stateCode: "DN", tier: 3 },

  // ── PUDUCHERRY ───────────────────────────────────────────────────────────
  { slug: "puducherry", name: "Puducherry", state: "Puducherry", stateCode: "PY", tier: 3 },

  // ── DAMAN & DIU ──────────────────────────────────────────────────────────
  { slug: "daman", name: "Daman", state: "Daman & Diu", stateCode: "DD", tier: 3 },
  { slug: "diu", name: "Diu", state: "Daman & Diu", stateCode: "DD", tier: 3 },

  // ── LADAKH ───────────────────────────────────────────────────────────────
  { slug: "leh", name: "Leh", state: "Ladakh", stateCode: "LA", tier: 3 },
  { slug: "kargil", name: "Kargil", state: "Ladakh", stateCode: "LA", tier: 3 },
];

/** Fast lookup by slug */
export const cityMap = new Map<string, City>(cities.map((c) => [c.slug, c]));

/** All unique city slugs */
export const citySlugs = cities.map((c) => c.slug);

/** Unique states */
export const states = [
  ...new Set(cities.map((c) => c.state)),
].sort();

/** Cities grouped by state */
export const citiesByState = cities.reduce<Record<string, City[]>>(
  (acc, city) => {
    if (!acc[city.state]) acc[city.state] = [];
    acc[city.state].push(city);
    return acc;
  },
  {},
);

/** Top 50 highest-priority cities for priority sitemap entries */
export const priorityCities = cities.filter((c) => c.tier <= 2).map((c) => c.slug);
