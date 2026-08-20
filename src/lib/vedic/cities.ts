export interface GeoPlace {
  name: string
  aliases: string[]
  lat: number
  lng: number
  tz: number
}

export const PLACES: GeoPlace[] = [
  { name: "New Delhi, India", aliases: ["delhi", "new delhi", "ncr"], lat: 28.6139, lng: 77.209, tz: 5.5 },
  { name: "Mumbai, India", aliases: ["bombay", "mumbai"], lat: 19.076, lng: 72.8777, tz: 5.5 },
  { name: "Bengaluru, India", aliases: ["bangalore", "bengaluru"], lat: 12.9716, lng: 77.5946, tz: 5.5 },
  { name: "Hyderabad, India", aliases: ["hyderabad"], lat: 17.385, lng: 78.4867, tz: 5.5 },
  { name: "Chennai, India", aliases: ["madras", "chennai"], lat: 13.0827, lng: 80.2707, tz: 5.5 },
  { name: "Kolkata, India", aliases: ["calcutta", "kolkata"], lat: 22.5726, lng: 88.3639, tz: 5.5 },
  { name: "Pune, India", aliases: ["pune", "poona"], lat: 18.5204, lng: 73.8567, tz: 5.5 },
  { name: "Ahmedabad, India", aliases: ["ahmedabad"], lat: 23.0225, lng: 72.5714, tz: 5.5 },
  { name: "Jaipur, India", aliases: ["jaipur"], lat: 26.9124, lng: 75.7873, tz: 5.5 },
  { name: "Lucknow, India", aliases: ["lucknow"], lat: 26.8467, lng: 80.9462, tz: 5.5 },
  { name: "Chandigarh, India", aliases: ["chandigarh"], lat: 30.7333, lng: 76.7794, tz: 5.5 },
  { name: "Varanasi, India", aliases: ["benaras", "varanasi", "kashi"], lat: 25.3176, lng: 82.9739, tz: 5.5 },
  { name: "Patna, India", aliases: ["patna"], lat: 25.5941, lng: 85.1376, tz: 5.5 },
  { name: "Bhopal, India", aliases: ["bhopal"], lat: 23.2599, lng: 77.4126, tz: 5.5 },
  { name: "Indore, India", aliases: ["indore"], lat: 22.7196, lng: 75.8577, tz: 5.5 },
  { name: "Nagpur, India", aliases: ["nagpur"], lat: 21.1458, lng: 79.0882, tz: 5.5 },
  { name: "Surat, India", aliases: ["surat"], lat: 21.1702, lng: 72.8311, tz: 5.5 },
  { name: "Kochi, India", aliases: ["cochin", "kochi", "ernakulam"], lat: 9.9312, lng: 76.2673, tz: 5.5 },
  { name: "Thiruvananthapuram, India", aliases: ["trivandrum", "thiruvananthapuram"], lat: 8.5241, lng: 76.9366, tz: 5.5 },
  { name: "Coimbatore, India", aliases: ["coimbatore"], lat: 11.0168, lng: 76.9558, tz: 5.5 },
  { name: "Madurai, India", aliases: ["madurai"], lat: 9.9252, lng: 78.1198, tz: 5.5 },
  { name: "Visakhapatnam, India", aliases: ["vizag", "visakhapatnam"], lat: 17.6868, lng: 83.2185, tz: 5.5 },
  { name: "Bhubaneswar, India", aliases: ["bhubaneswar"], lat: 20.2961, lng: 85.8245, tz: 5.5 },
  { name: "Guwahati, India", aliases: ["guwahati", "gauhati"], lat: 26.1445, lng: 91.7362, tz: 5.5 },
  { name: "Amritsar, India", aliases: ["amritsar"], lat: 31.634, lng: 74.8723, tz: 5.5 },
  { name: "Srinagar, India", aliases: ["srinagar"], lat: 34.0837, lng: 74.7973, tz: 5.5 },
  { name: "Goa, India", aliases: ["goa", "panaji", "panjim"], lat: 15.4909, lng: 73.8278, tz: 5.5 },
  { name: "Udaipur, India", aliases: ["udaipur"], lat: 24.5854, lng: 73.7125, tz: 5.5 },
  { name: "Jodhpur, India", aliases: ["jodhpur"], lat: 26.2389, lng: 73.0243, tz: 5.5 },
  { name: "Noida, India", aliases: ["noida"], lat: 28.5355, lng: 77.391, tz: 5.5 },
  { name: "Gurgaon, India", aliases: ["gurgaon", "gurugram"], lat: 28.4595, lng: 77.0266, tz: 5.5 },
  { name: "London, UK", aliases: ["london"], lat: 51.5074, lng: -0.1278, tz: 1 },
  { name: "New York, USA", aliases: ["new york", "nyc"], lat: 40.7128, lng: -74.006, tz: -4 },
  { name: "San Francisco, USA", aliases: ["san francisco", "sf", "bay area"], lat: 37.7749, lng: -122.4194, tz: -7 },
  { name: "Los Angeles, USA", aliases: ["los angeles", "la"], lat: 34.0522, lng: -118.2437, tz: -7 },
  { name: "Chicago, USA", aliases: ["chicago"], lat: 41.8781, lng: -87.6298, tz: -5 },
  { name: "Toronto, Canada", aliases: ["toronto"], lat: 43.6532, lng: -79.3832, tz: -4 },
  { name: "Dubai, UAE", aliases: ["dubai"], lat: 25.2048, lng: 55.2708, tz: 4 },
  { name: "Singapore", aliases: ["singapore"], lat: 1.3521, lng: 103.8198, tz: 8 },
  { name: "Sydney, Australia", aliases: ["sydney"], lat: -33.8688, lng: 151.2093, tz: 10 },
  { name: "Melbourne, Australia", aliases: ["melbourne"], lat: -37.8136, lng: 144.9631, tz: 10 },
  { name: "Kathmandu, Nepal", aliases: ["kathmandu"], lat: 27.7172, lng: 85.324, tz: 5.75 },
  { name: "Colombo, Sri Lanka", aliases: ["colombo"], lat: 6.9271, lng: 79.8612, tz: 5.5 },
  { name: "Dhaka, Bangladesh", aliases: ["dhaka"], lat: 23.8103, lng: 90.4125, tz: 6 },
]

export const DEFAULT_PLACE = PLACES[0]

const liveCache = new Map<string, GeoPlace>()

export function cachePlace(query: string, place: GeoPlace) {
  const q = query.toLowerCase().trim()
  if (q) liveCache.set(q, place)
}

export function knownPlace(query: string | undefined | null): GeoPlace | null {
  if (!query) return null
  const q = query.toLowerCase().trim()
  if (!q) return null
  const cached = liveCache.get(q)
  if (cached) return cached
  const exact = PLACES.find((p) => p.name.toLowerCase() === q || p.aliases.includes(q))
  if (exact) return exact
  const fuzzy = PLACES.find(
    (p) =>
      p.aliases.some((a) => q.includes(a) || a.includes(q)) ||
      p.name.toLowerCase().includes(q) ||
      q.includes(p.name.split(",")[0].toLowerCase())
  )
  return fuzzy || null
}

export function resolvePlace(query: string | undefined | null): GeoPlace {
  return knownPlace(query) || DEFAULT_PLACE
}
