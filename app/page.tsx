'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  ChevronDown,
  Heart,
  HelpCircle,
  Home,
  LogOut,
  MapPin,
  Menu,
  MessageCircle,
  Search,
  Send,
  Settings,
  Star,
  User,
  Users,
} from 'lucide-react';

const properties = [
  {
    name: 'Arihant Homes',
    type: 'Hostel',
    location: 'Pondha · Near Petrol Pump',
    price: '₹9,500',
    googleRating: '4.2',
    studentRating: '8.6',
    food: 'Jain · Veg · Non-Veg',
    image:
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=85',
    tag: 'Popular',
    distance: '1.4 km',
  },
  {
    name: 'Bella Vista Girls Hostel',
    type: 'Hostel',
    location: 'Upper Kandoli · Near Kandoli Adda',
    price: '₹10,500',
    googleRating: '4.4',
    studentRating: '9.1',
    food: 'Vegetarian · Non-Veg',
    image:
      'https://images.unsplash.com/photo-1560185008-bf9bbd7b4f48?auto=format&fit=crop&w=1200&q=85',
    tag: 'Girls only',
    distance: '2.1 km',
  },
  {
    name: 'Aone Hostel',
    type: 'Hostel',
    location: 'Pondha · Dehradun',
    price: '₹8,500',
    googleRating: '4.0',
    studentRating: '8.3',
    food: 'Jain · Vegetarian',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85',
    tag: 'Best value',
    distance: '1.8 km',
  },
];

type PageType =
  | 'home'
  | 'explore'
  | 'detail'
  | 'list'
  | 'roommate';

export default function Page() {
  const [page, setPage] = useState<PageType>('home');
  const [selected, setSelected] = useState(properties[0]);
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState<string[]>([]);
  const [toast, setToast] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filtered = useMemo(
    () =>
      properties.filter((p) =>
        (p.name + p.location + p.type + p.food)
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [query]
  );

  const openDetail = (p: any) => {
    setSelected(p);
    setPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const notify = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(''), 2200);
  };

  return (
    <main>
      {toast && (
        <div className="fixed right-5 top-5 z-[100] rounded-full bg-[#171614] px-5 py-3 text-sm text-white shadow-2xl">
          {toast}
        </div>
      )}

      {/* HEADER */}
      <header className="shell relative flex items-center justify-between py-7">
        <button
          onClick={() => {
            setPage('home');
            setProfileOpen(false);
          }}
          className="brand text-[25px]"
        >
          pardesi<span className="font-normal">homes</span>
        </button>

        <nav className="desktop flex items-center gap-8 text-[13px] font-medium">
          <button onClick={() => setPage('explore')}>
            Explore stays
          </button>

          <button
            onClick={() => {
              setPage('home');

              setTimeout(() => {
                document
                  .getElementById('why')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
          >
            Why PardesiHomes
          </button>

          <button onClick={() => setPage('list')}>
            List a property
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setPage('roommate');
              setProfileOpen(false);
            }}
            className="hidden rounded-full bg-[#171614] px-5 py-3 text-xs text-white md:block"
          >
            Need a roommate?
          </button>

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() =>
                setProfileOpen((value) => !value)
              }
              className="flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-3 text-xs font-medium shadow-sm"
            >
              <User size={15} />

              <span className="desktop">Profile</span>

              <ChevronDown size={13} />
            </button>

            {profileOpen && (
              <ProfileMenu
                onProfile={() =>
                  notify('Profile opened')
                }
                onSaved={() =>
                  notify('Saved stays opened')
                }
                onEnquiries={() =>
                  notify('No enquiries yet')
                }
                onList={() => {
                  setProfileOpen(false);
                  setPage('list');
                }}
                onSettings={() =>
                  notify('Settings opened')
                }
                onHelp={() =>
                  notify('Help & Support opened')
                }
                onLogout={() =>
                  notify('Logged out for demo')
                }
              />
            )}
          </div>

          <div className="relative md:hidden">
            <button
              onClick={() => {
                setMobileMenuOpen((value) => !value);
                setProfileOpen(false);
              }}
              className="rounded-full border border-black/10 bg-white/60 p-3"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={18} />
            </button>

            {mobileMenuOpen && (
              <MobileNavMenu
                onExplore={() => {
                  setPage('explore');
                  setMobileMenuOpen(false);
                }}
                onHowItWorks={() => {
                  setPage('home');
                  setMobileMenuOpen(false);
                  setTimeout(() => {
                    document
                      .getElementById('how')
                      ?.scrollIntoView({
                        behavior: 'smooth',
                      });
                  }, 50);
                }}
                onList={() => {
                  setPage('list');
                  setMobileMenuOpen(false);
                }}
                onRoommate={() => {
                  setPage('roommate');
                  setMobileMenuOpen(false);
                  setProfileOpen(false);
                }}
              />
            )}
          </div>
        </div>
      </header>

      {page === 'home' && (
        <HomeView
          onExplore={() => setPage('explore')}
          onList={() => setPage('list')}
          onRoommate={() => setPage('roommate')}
          onDetail={openDetail}
          saved={saved}
          setSaved={setSaved}
        />
      )}

      {page === 'explore' && (
        <Explore
          query={query}
          setQuery={setQuery}
          results={filtered}
          onBack={() => setPage('home')}
          onDetail={openDetail}
          saved={saved}
          setSaved={setSaved}
        />
      )}

      {page === 'detail' && (
        <Detail
          p={selected}
          onBack={() => setPage('explore')}
          onEnquire={() =>
            notify('Enquiry saved for demo')
          }
        />
      )}

      {page === 'list' && (
        <ListProperty
          onBack={() => setPage('home')}
          onSubmit={() => {
            notify('Property submitted for demo');
            setPage('home');
          }}
        />
      )}

      {page === 'roommate' && (
        <Roommate
          onBack={() => setPage('home')}
          onSubmit={() =>
            notify(
              'Roommate request submitted for demo'
            )
          }
        />
      )}

      <footer className="shell flex flex-col gap-3 border-t border-black/10 py-8 text-xs text-black/45 md:flex-row md:justify-between">
        <span>PardesiHomes © 2026</span>
        <span>
          Built for students moving to a new city.
        </span>
      </footer>
    </main>
  );
}

/* =========================================================
   PROFILE
========================================================= */

function MobileNavMenu({
  onExplore,
  onHowItWorks,
  onList,
  onRoommate,
}: {
  onExplore: () => void;
  onHowItWorks: () => void;
  onList: () => void;
  onRoommate: () => void;
}) {
  return (
    <div className="absolute right-0 top-full z-[100] mt-3 w-[min(280px,calc(100vw-2rem))] overflow-hidden rounded-[24px] border border-black/10 bg-white p-2 shadow-2xl md:hidden">
      <div className="py-1">
        <MobileNavItem
          label="Explore stays"
          onClick={onExplore}
        />
        <MobileNavItem
          label="How it works"
          onClick={onHowItWorks}
        />
        <MobileNavItem
          label="List a property"
          onClick={onList}
        />
        <MobileNavItem
          label="Need a roommate?"
          onClick={onRoommate}
        />
      </div>
    </div>
  );
}

function MobileNavItem({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center rounded-xl px-4 py-3.5 text-left text-[13px] font-medium transition hover:bg-black/5"
    >
      {label}
    </button>
  );
}

function ProfileMenu({
  onProfile,
  onSaved,
  onEnquiries,
  onList,
  onSettings,
  onHelp,
  onLogout,
}: {
  onProfile: () => void;
  onSaved: () => void;
  onEnquiries: () => void;
  onList: () => void;
  onSettings: () => void;
  onHelp: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="absolute right-0 top-full z-[100] mt-3 w-64 overflow-hidden rounded-[24px] border border-black/10 bg-white p-2 shadow-2xl">
      <div className="border-b border-black/10 px-4 py-4">
        <p className="text-sm font-semibold">
          Your PardesiHomes
        </p>

        <p className="mt-1 text-[11px] text-black/45">
          Manage your stays and account
        </p>
      </div>

      <div className="py-2">
        <ProfileItem
          icon={<User size={15} />}
          label="My Profile"
          onClick={onProfile}
        />

        <ProfileItem
          icon={<Bookmark size={15} />}
          label="Saved Stays"
          onClick={onSaved}
        />

        <ProfileItem
          icon={<MessageCircle size={15} />}
          label="My Enquiries"
          onClick={onEnquiries}
        />

        <ProfileItem
          icon={<Home size={15} />}
          label="List a Property"
          onClick={onList}
        />

        <ProfileItem
          icon={<Settings size={15} />}
          label="Settings"
          onClick={onSettings}
        />

        <ProfileItem
          icon={<HelpCircle size={15} />}
          label="Help & Support"
          onClick={onHelp}
        />
      </div>

      <div className="border-t border-black/10 pt-2">
        <ProfileItem
          icon={<LogOut size={15} />}
          label="Log Out"
          onClick={onLogout}
        />
      </div>
    </div>
  );
}

function ProfileItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs transition hover:bg-black/5"
    >
      <span className="text-black/55">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

/* =========================================================
   HOME
========================================================= */

function HomeView({
  onExplore,
  onList,
  onRoommate,
  onDetail,
  saved,
  setSaved,
}: {
  onExplore: () => void;
  onList: () => void;
  onRoommate: () => void;
  onDetail: (p: any) => void;
  saved: string[];
  setSaved: any;
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  return (
    <>
      {/* HERO */}
      <section className="shell">
        <div className="hero">
          <img
            className="heroImg"
            src="/upes.jpg"
            alt="UPES campus in Dehradun"
          />

          <div className="heroContent">
            {/* SEARCH */}
            <div
              className={`glass navPill ${
                mobileFiltersOpen
                  ? 'navPillExpanded'
                  : ''
              }`}
            >
              <div className="desktop flex items-center gap-8 text-xs">
                <LocationFilter />
                <PropertyTypeFilter />
                <DistanceFilter />
                <RentFilter />
                <FoodFilter />
              </div>

              {mobileFiltersOpen && (
                <MobileFilterPanel
                  onFindStay={() => {
                    setMobileFiltersOpen(false);
                    onExplore();
                  }}
                />
              )}

              <button
                onClick={onExplore}
                className="hidden rounded-full bg-white px-5 py-3 text-xs font-medium shadow-sm md:inline-flex md:items-center"
              >
                Find stays
                <ArrowUpRight
                  className="ml-1 inline"
                  size={14}
                />
              </button>

              <button
                onClick={() =>
                  setMobileFiltersOpen(
                    (value) => !value
                  )
                }
                className="inline-flex items-center rounded-full bg-white px-5 py-3 text-xs font-medium shadow-sm md:hidden"
              >
                Find stays
                <ArrowUpRight
                  className="ml-1 inline"
                  size={14}
                />
              </button>
            </div>

            {/* HERO TEXT */}
            <div className="mt-auto p-6 pb-8 md:p-9">
              <div className="max-w-[690px] self-end">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-xs">
                  Student stays around UPES

                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>

                <h1 className="heroTitle">
                  A better way
                  <br />
                  to find your stay.
                </h1>

                <p className="mt-6 max-w-[560px] text-[15px] leading-6 text-white/85">
                  Discover hostels, PGs, flats and shared
                  rooms around your university, compare
                  the basics, and see what students really
                  think before you choose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DISCOVER */}
      <section className="section shell">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">
              Discover stays
            </p>

            <h2 className="sectionTitle mt-3">
              Places students
              <br />
              are actually considering.
            </h2>
          </div>

          <button
            onClick={onExplore}
            className="flex items-center gap-2 text-sm font-semibold"
          >
            Explore all
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {properties.map((p) => (
            <PropertyCard
              key={p.name}
              p={p}
              onOpen={onDetail}
              saved={saved.includes(p.name)}
              onSave={() =>
                setSaved((s: string[]) =>
                  s.includes(p.name)
                    ? s.filter(
                        (x) => x !== p.name
                      )
                    : [...s, p.name]
                )
              }
            />
          ))}
        </div>

        {/* =================================================
            OUR 3 DIFFERENTIATORS
        ================================================= */}

        <section
          id="why"
          className="mt-12"
        >
          <div id="how" className="scroll-mt-28" />

          <div className="mb-7">
            <p className="eyebrow">
              Why PardesiHomes
            </p>

            <h2 className="mt-3 text-3xl font-medium tracking-[-.045em] md:text-4xl">
              More than just a property listing.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* 01 */}
            <div className="rounded-[28px] bg-[#171614] p-7 text-white">
              <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                <Star
                  size={19}
                  fill="currentColor"
                />
              </div>

              <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
                01
              </p>

              <h3 className="mt-2 text-2xl font-medium tracking-[-.04em]">
                Student Honest Reviews
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/55">
                Real experiences, not just property
                ratings. See what students actually
                think about food, cleanliness,
                management and safety.
              </p>

              <div className="mt-6 flex items-center gap-2">
                <span className="rounded-full bg-white/10 px-3 py-2 text-[11px]">
                  Real experiences
                </span>

                <span className="rounded-full bg-white/10 px-3 py-2 text-[11px]">
                  /10 rating
                </span>
              </div>
            </div>

            {/* 02 */}
            <div className="rounded-[28px] border border-black/10 bg-white/65 p-7">
              <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-full bg-black/[0.05]">
                <span className="text-lg">
                  ₹
                </span>
              </div>

              <p className="text-[10px] uppercase tracking-[0.16em] text-black/35">
                02
              </p>

              <h3 className="mt-2 text-2xl font-medium tracking-[-.04em]">
                Food That Fits You
              </h3>

              <p className="mt-3 text-sm leading-6 text-black/50">
                Find stays that match your food
                preferences.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-black/[0.05] px-3 py-2 text-[11px]">
                  Jain
                </span>

                <span className="rounded-full bg-black/[0.05] px-3 py-2 text-[11px]">
                  Vegetarian
                </span>

                <span className="rounded-full bg-black/[0.05] px-3 py-2 text-[11px]">
                  Non-Vegetarian
                </span>
              </div>
            </div>

            {/* 03 */}
            <div className="rounded-[28px] border border-black/10 bg-white/65 p-7">
              <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-full bg-black/[0.05]">
                <Search size={18} />
              </div>

              <p className="text-[10px] uppercase tracking-[0.16em] text-black/35">
                03
              </p>

              <h3 className="mt-2 text-2xl font-medium tracking-[-.04em]">
                Student-First Search
              </h3>

              <p className="mt-3 text-sm leading-6 text-black/50">
                Everything you need to find the
                right stay near your campus.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-black/[0.05] px-3 py-2 text-[11px]">
                  Budget
                </span>

                <span className="rounded-full bg-black/[0.05] px-3 py-2 text-[11px]">
                  Distance
                </span>

                <span className="rounded-full bg-black/[0.05] px-3 py-2 text-[11px]">
                  Property Type
                </span>
              </div>
            </div>
          </div>

          <p className="mt-7 text-center text-lg font-medium tracking-[-.025em] text-black/70">
            Finding a room is easy. Finding the right
            place to live isn't.
          </p>
        </section>
      </section>

      {/* STUDENT REALITY */}
      <section className="shell grid gap-5 pb-20 md:grid-cols-[1.25fr_.75fr]">
        <div className="factCard">
          <p className="eyebrow text-white/50">
            Student Reality
          </p>

          <h3 className="mt-5 max-w-[560px] text-4xl font-medium leading-tight tracking-[-.04em]">
            Don't just trust the listing. See what
            students actually experience.
          </h3>

          <p className="mt-6 max-w-[520px] text-sm leading-6 text-white/55">
            PardesiHomes puts real student experience
            next to the information provided by a
            property.
          </p>
        </div>

        <div className="glass rounded-[30px] p-8">
          <p className="eyebrow">
            Two perspectives
          </p>

          <h3 className="mt-3 text-3xl font-medium tracking-[-.04em]">
            Google vs Student Reality.
          </h3>

          <div className="mt-7 space-y-3">
            <ScoreRow
              label="Cleanliness"
              score="8.8"
            />

            <ScoreRow
              label="Food"
              score="7.9"
            />

            <ScoreRow
              label="Management"
              score="7.2"
            />

            <ScoreRow
              label="Safety"
              score="9.1"
            />
          </div>
        </div>
      </section>

      {/* LIST */}
      <section className="shell pb-20">
        <div className="ctaCard">
          <div className="max-w-[650px]">
            <p className="eyebrow">
              List a property
            </p>

            <h2 className="mt-3 text-5xl font-medium tracking-[-.055em]">
              Know a good stay?
              <br />
              Put it on the map.
            </h2>

            <p className="mt-5 max-w-[500px] text-sm leading-6 text-black/55">
              Students know the best places first.
              Add a hostel, PG, flat or shared room
              and help the next batch find it.
            </p>

            <button
              onClick={onList}
              className="mt-7 rounded-full bg-[#171614] px-6 py-3 text-sm text-white"
            >
              List a property
              <ArrowUpRight
                className="ml-1 inline"
                size={15}
              />
            </button>
          </div>

          <div className="ctaBubble" />
        </div>
      </section>

      {/* ROOMMATE */}
      <section className="shell pb-24">
        <div className="glass rounded-[32px] p-8 md:flex md:items-center md:justify-between md:p-10">
          <div>
            <p className="eyebrow">
              Need a roommate?
            </p>

            <h2 className="mt-3 text-4xl font-medium tracking-[-.05em]">
              Find someone to share the next chapter.
            </h2>

            <p className="mt-3 max-w-[620px] text-sm leading-6 text-black/55">
              Tell us your campus, budget and
              preferences. We'll turn the idea into a
              simple roommate matching experience.
            </p>
          </div>

          <button
            onClick={onRoommate}
            className="mt-6 shrink-0 rounded-full bg-[#171614] px-6 py-3 text-sm text-white md:mt-0"
          >
            I need a roommate
            <ArrowRight
              className="ml-1 inline"
              size={15}
            />
          </button>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   FILTERS
========================================================= */

function LocationFilter() {
  const [open, setOpen] = useState(false);
  const [location, setLocation] =
    useState('UPES, Dehradun');

  const options = [
    {
      name: 'UPES, Dehradun',
      disabled: false,
    },
    {
      name: 'Graphic Era University',
      disabled: true,
    },
    {
      name: 'Uttaranchal University',
      disabled: true,
    },
  ];

  return (
    <Dropdown
      icon={<MapPin size={13} />}
      label="Location"
      value={location}
      open={open}
      setOpen={setOpen}
    >
      {options.map((option) => (
        <button
          key={option.name}
          disabled={option.disabled}
          onClick={() => {
            if (!option.disabled) {
              setLocation(option.name);
              setOpen(false);
            }
          }}
          className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs ${
            option.disabled
              ? 'cursor-not-allowed opacity-45'
              : 'hover:bg-black/5'
          }`}
        >
          <span>{option.name}</span>

          {option.disabled && (
            <span className="ml-2 text-[9px] uppercase tracking-wide">
              Coming soon
            </span>
          )}
        </button>
      ))}
    </Dropdown>
  );
}

function PropertyTypeFilter() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('Hostel');

  const options = [
    'Hostel',
    'PG',
    'Flat',
    'Shared Room',
  ];

  return (
    <Dropdown
      icon={<Home size={13} />}
      label="Property type"
      value={type}
      open={open}
      setOpen={setOpen}
    >
      {options.map((item) => (
        <button
          key={item}
          onClick={() => {
            setType(item);
            setOpen(false);
          }}
          className={`block w-full rounded-xl px-3 py-2.5 text-left text-xs ${
            type === item
              ? 'bg-[#171614] text-white'
              : 'hover:bg-black/5'
          }`}
        >
          {item}
        </button>
      ))}
    </Dropdown>
  );
}

function DistanceFilter() {
  const [open, setOpen] = useState(false);
  const [distance, setDistance] =
    useState('< 1 km');

  const options = [
    '> 100 m',
    '> 200 m',
    '> 500 m',
    '> 1 km',
    '< 1 km',
    '< 5 km',
  ];

  return (
    <Dropdown
      icon={<MapPin size={13} />}
      label="Distance from college"
      value={distance}
      open={open}
      setOpen={setOpen}
    >
      {options.map((item) => (
        <button
          key={item}
          onClick={() => {
            setDistance(item);
            setOpen(false);
          }}
          className={`block w-full rounded-xl px-3 py-2.5 text-left text-xs ${
            distance === item
              ? 'bg-[#171614] text-white'
              : 'hover:bg-black/5'
          }`}
        >
          {item}
        </button>
      ))}
    </Dropdown>
  );
}

function RentFilter() {
  const [open, setOpen] = useState(false);
  const [rent, setRent] =
    useState('< ₹15,000');

  const options = [
    '< ₹5,000',
    '< ₹8,000',
    '< ₹10,000',
    '< ₹12,000',
    '< ₹15,000',
    '< ₹20,000',
  ];

  return (
    <Dropdown
      icon={<span className="text-[13px]">₹</span>}
      label="Max rent"
      value={rent}
      open={open}
      setOpen={setOpen}
    >
      {options.map((item) => (
        <button
          key={item}
          onClick={() => {
            setRent(item);
            setOpen(false);
          }}
          className={`block w-full rounded-xl px-3 py-2.5 text-left text-xs ${
            rent === item
              ? 'bg-[#171614] text-white'
              : 'hover:bg-black/5'
          }`}
        >
          {item}
        </button>
      ))}
    </Dropdown>
  );
}

function FoodFilter() {
  const [open, setOpen] = useState(false);
  const [food, setFood] =
    useState('Any');

  const options = [
    'Any',
    'Jain',
    'Vegetarian',
    'Non-Vegetarian',
  ];

  return (
    <Dropdown
      icon={<span className="text-[13px]">🍽</span>}
      label="Food preference"
      value={food}
      open={open}
      setOpen={setOpen}
    >
      {options.map((item) => (
        <button
          key={item}
          onClick={() => {
            setFood(item);
            setOpen(false);
          }}
          className={`block w-full rounded-xl px-3 py-2.5 text-left text-xs ${
            food === item
              ? 'bg-[#171614] text-white'
              : 'hover:bg-black/5'
          }`}
        >
          {item}
        </button>
      ))}
    </Dropdown>
  );
}

function Dropdown({
  icon,
  label,
  value,
  open,
  setOpen,
  children,
  fullWidth = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={`relative ${
        fullWidth ? 'w-full min-w-0' : ''
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 text-left ${
          fullWidth ? 'w-full justify-between' : ''
        }`}
      >
        <span className="flex min-w-0 items-center gap-2">
          {icon}

          <span className="min-w-0">
            <span className="block text-[10px] text-black/45">
              {label}
            </span>

            <span className="block truncate font-medium">
              {value}

              <ChevronDown
                className="ml-1 inline shrink-0"
                size={12}
              />
            </span>
          </span>
        </span>
      </button>

      {open && (
        <div
          className={`absolute left-0 top-full z-[80] mt-3 rounded-2xl border border-black/10 bg-white p-2 shadow-xl ${
            fullWidth
              ? 'right-0 min-w-0 max-w-full'
              : 'min-w-[210px]'
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function MobileFilterPanel({
  onFindStay,
}: {
  onFindStay: () => void;
}) {
  const [locationOpen, setLocationOpen] =
    useState(false);
  const [location, setLocation] =
    useState('UPES, Dehradun');

  const [typeOpen, setTypeOpen] = useState(false);
  const [type, setType] = useState('Hostel');

  const [distanceOpen, setDistanceOpen] =
    useState(false);
  const [distance, setDistance] =
    useState('< 1 km');

  const [rentOpen, setRentOpen] = useState(false);
  const [rent, setRent] =
    useState('< ₹15,000');

  const locationOptions = [
    {
      name: 'UPES, Dehradun',
      disabled: false,
    },
    {
      name: 'Graphic Era',
      disabled: true,
    },
    {
      name: 'Uttaranchal',
      disabled: true,
    },
  ];

  const typeOptions = [
    'Hostel',
    'PG',
    'Flat',
    'Shared Room',
  ];

  const distanceOptions = [
    '> 100 m',
    '> 200 m',
    '> 500 m',
    '> 1 km',
    '< 1 km',
    '< 5 km',
  ];

  const rentOptions = [
    '< ₹5,000',
    '< ₹8,000',
    '< ₹10,000',
    '< ₹12,000',
    '< ₹15,000',
    '< ₹20,000',
  ];

  return (
    <div className="mobileFilterPanel md:hidden">
      <Dropdown
        icon={<MapPin size={13} />}
        label="Location"
        value={location}
        open={locationOpen}
        setOpen={setLocationOpen}
        fullWidth
      >
        {locationOptions.map((option) => (
          <button
            key={option.name}
            disabled={option.disabled}
            onClick={() => {
              if (!option.disabled) {
                setLocation(option.name);
                setLocationOpen(false);
              }
            }}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs ${
              option.disabled
                ? 'cursor-not-allowed opacity-45'
                : 'hover:bg-black/5'
            }`}
          >
            <span>{option.name}</span>

            {option.disabled && (
              <span className="ml-2 shrink-0 text-[9px] uppercase tracking-wide">
                Coming soon
              </span>
            )}
          </button>
        ))}
      </Dropdown>

      <Dropdown
        icon={<Home size={13} />}
        label="Property type"
        value={type}
        open={typeOpen}
        setOpen={setTypeOpen}
        fullWidth
      >
        {typeOptions.map((item) => (
          <button
            key={item}
            onClick={() => {
              setType(item);
              setTypeOpen(false);
            }}
            className={`block w-full rounded-xl px-3 py-2.5 text-left text-xs ${
              type === item
                ? 'bg-[#171614] text-white'
                : 'hover:bg-black/5'
            }`}
          >
            {item}
          </button>
        ))}
      </Dropdown>

      <Dropdown
        icon={<MapPin size={13} />}
        label="Distance from college"
        value={distance}
        open={distanceOpen}
        setOpen={setDistanceOpen}
        fullWidth
      >
        {distanceOptions.map((item) => (
          <button
            key={item}
            onClick={() => {
              setDistance(item);
              setDistanceOpen(false);
            }}
            className={`block w-full rounded-xl px-3 py-2.5 text-left text-xs ${
              distance === item
                ? 'bg-[#171614] text-white'
                : 'hover:bg-black/5'
            }`}
          >
            {item}
          </button>
        ))}
      </Dropdown>

      <Dropdown
        icon={<span className="text-[13px]">₹</span>}
        label="Max rent"
        value={rent}
        open={rentOpen}
        setOpen={setRentOpen}
        fullWidth
      >
        {rentOptions.map((item) => (
          <button
            key={item}
            onClick={() => {
              setRent(item);
              setRentOpen(false);
            }}
            className={`block w-full rounded-xl px-3 py-2.5 text-left text-xs ${
              rent === item
                ? 'bg-[#171614] text-white'
                : 'hover:bg-black/5'
            }`}
          >
            {item}
          </button>
        ))}
      </Dropdown>

      <button
        onClick={onFindStay}
        className="mt-1 w-full rounded-full bg-[#171614] px-5 py-3 text-xs font-medium text-white"
      >
        Find Stay
        <ArrowUpRight
          className="ml-1 inline"
          size={14}
        />
      </button>
    </div>
  );
}

/* =========================================================
   PROPERTY CARD
========================================================= */

function PropertyCard({
  p,
  onOpen,
  saved,
  onSave,
}: {
  p: any;
  onOpen: (p: any) => void;
  saved: boolean;
  onSave: () => void;
}) {
  return (
    <article className="propertyCard">
      <div className="relative">
        <img
          className="propertyImg"
          src={p.image}
          alt={p.name}
        />

        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-2 text-[11px]">
          {p.tag}
        </span>

        <button
          onClick={onSave}
          className="absolute right-4 top-4 rounded-full bg-white/90 p-3"
        >
          <Heart
            size={16}
            fill={
              saved
                ? 'currentColor'
                : 'none'
            }
          />
        </button>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold">
          {p.name}
        </h3>

        <p className="mt-1 text-xs text-black/50">
          {p.location}
        </p>

        {/* RATINGS */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-black/[0.035] px-3 py-2">
            <p className="text-[9px] uppercase tracking-wide text-black/40">
              Google Rating
            </p>

            <p className="mt-0.5 flex items-center gap-1 text-xs font-semibold">
              <Star
                size={11}
                fill="currentColor"
              />
              {p.googleRating}/5
            </p>
          </div>

          <div className="rounded-xl bg-black/[0.035] px-3 py-2">
            <p className="text-[9px] uppercase tracking-wide text-black/40">
              Student Honest
            </p>

            <p className="mt-0.5 text-xs font-semibold">
              {p.studentRating}/10
            </p>
          </div>
        </div>

        {/* FOOD */}
        <div className="mt-3 rounded-xl bg-black/[0.035] px-3 py-2">
          <p className="text-[9px] uppercase tracking-wide text-black/40">
            Food
          </p>

          <p className="mt-0.5 text-xs font-medium">
            {p.food}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
          <div>
            <p className="text-[10px] text-black/45">
              Starting from
            </p>

            <p className="font-semibold">
              {p.price}
              <span className="font-normal text-black/45">
                /mo
              </span>
            </p>
          </div>

          <button
            onClick={() => onOpen(p)}
            className="rounded-full bg-[#171614] px-4 py-2 text-xs text-white"
          >
            View stay
          </button>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   SCORE
========================================================= */

function ScoreRow({
  label,
  score,
}: {
  label: string;
  score: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 text-xs">
        {label}
      </span>

      <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/8">
        <div
          className="h-full rounded-full bg-[#171614]"
          style={{
            width: `${Number(score) * 10}%`,
          }}
        />
      </div>

      <span className="w-8 text-right text-xs font-semibold">
        {score}
      </span>
    </div>
  );
}

/* =========================================================
   EXPLORE
========================================================= */

function Explore({
  query,
  setQuery,
  results,
  onBack,
  onDetail,
  saved,
  setSaved,
}: {
  query: string;
  setQuery: (x: string) => void;
  results: any[];
  onBack: () => void;
  onDetail: (p: any) => void;
  saved: string[];
  setSaved: any;
}) {
  return (
    <div className="formShell shell">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm"
      >
        <ArrowRight
          className="rotate-180"
          size={16}
        />
        Home
      </button>

      <div className="mt-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">
            Explore stays
          </p>

          <h1 className="sectionTitle mt-3">
            Find a place that
            <br />
            fits your life.
          </h1>
        </div>

        <div className="flex w-full max-w-md items-center gap-3 rounded-full border border-black/10 bg-white/70 px-5 py-3">
          <Search size={17} />

          <input
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Search Arihant, Pondha, PG..."
          />
        </div>
      </div>

      <div className="mt-10 flex gap-2 overflow-auto pb-2">
        {[
          'Under ₹10k',
          'Under ₹15k',
          'Near UPES',
          'Girls only',
          'Jain food',
          'Vegetarian',
          'Non-Veg',
        ].map((item) => (
          <button
            key={item}
            className="pill whitespace-nowrap"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {results.map((p) => (
          <PropertyCard
            key={p.name}
            p={p}
            onOpen={onDetail}
            saved={saved.includes(p.name)}
            onSave={() =>
              setSaved((s: string[]) =>
                s.includes(p.name)
                  ? s.filter(
                      (x) => x !== p.name
                    )
                  : [...s, p.name]
              )
            }
          />
        ))}
      </div>

      {!results.length && (
        <div className="glass mt-8 rounded-3xl p-10 text-center">
          No matching stays yet.
        </div>
      )}
    </div>
  );
}

/* =========================================================
   DETAIL
========================================================= */

function Detail({
  p,
  onBack,
  onEnquire,
}: {
  p: any;
  onBack: () => void;
  onEnquire: () => void;
}) {
  
    
      const reviews = [
        [
          'Riya',
          'Food is good and I actually like the variety, but after a few weeks some dishes do start feeling repetitive.',
          '8.4',
        ],
        [
          'Karan',
          'The staff is genuinely very sincere and helpful. The lobby is also really neat and clean. Parking is pretty adequate too.',
          '9.1',
        ],
        [
          'Aman',
          'The warden is quite strict about timings. Also, there are no convenience shops nearby, so getting small things can be a pain.',
          '7.6',
        ],
        [
          'Ananya',
          'My main issue was the security deposit refund. The policy was not very clear and the refund took longer than I expected.',
          '6.9',
        ],
      ];

  return (
    <div className="formShell shell">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm"
      >
        <ArrowRight
          className="rotate-180"
          size={16}
        />
        Back to stays
      </button>

      <div className="mt-8 overflow-hidden rounded-[34px] bg-[#f7f4ef] shadow-xl">
        <div className="grid md:grid-cols-[1.25fr_.75fr]">
          <img
            src={p.image}
            className="h-[430px] w-full object-cover"
            alt={p.name}
          />

          <div className="p-7 md:p-9">
            <div className="flex justify-between">
              <span className="pill">
                {p.tag}
              </span>

              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-sm font-semibold">
                  <Star
                    size={13}
                    fill="currentColor"
                  />
                  {p.googleRating}/5
                </div>

                <p className="mt-1 text-[10px] text-black/45">
                  Google rating
                </p>
              </div>
            </div>

            <h1 className="mt-8 text-5xl font-medium tracking-[-.06em]">
              {p.name}
            </h1>

            <p className="mt-3 flex items-center gap-1 text-sm text-black/55">
              <MapPin size={14} />
              {p.location}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <Info
                l="Rent"
                v={`${p.price}/mo`}
              />

              <Info
                l="Distance"
                v={`${p.distance} from UPES`}
              />

              <Info
                l="Property"
                v={p.type}
              />

              <Info
                l="Food"
                v={p.food}
              />
            </div>

            <button
              onClick={onEnquire}
              className="mt-7 w-full rounded-full bg-[#171614] px-6 py-4 text-sm text-white"
            >
              Enquire about this stay
              <ArrowUpRight
                className="ml-1 inline"
                size={15}
              />
            </button>
          </div>
        </div>

        {/* HONEST REVIEWS */}
        <div className="border-t border-black/10 p-7 md:p-9">
          <div className="grid gap-8 md:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow">
                Student Honest Rating
              </p>

              <div className="mt-2 flex items-end gap-3">
                <span className="text-6xl font-semibold tracking-[-.06em]">
                  {p.studentRating}
                </span>

                <span className="pb-2 text-sm text-black/45">
                  / 10
                </span>
              </div>

              <p className="mt-2 text-xs text-black/45">
                Based on student experiences
              </p>

              <div className="mt-6 space-y-3">
                <ScoreRow
                  label="Cleanliness"
                  score="8.8"
                />

                <ScoreRow
                  label="Food"
                  score="8.1"
                />

                <ScoreRow
                  label="Management"
                  score="7.4"
                />

                <ScoreRow
                  label="Safety"
                  score="9.2"
                />
              </div>
            </div>

            <div>
              <p className="eyebrow">
                What students say
              </p>

              <div className="mt-3 space-y-3">
                {reviews.map((review) => (
                  <div
                    key={review[0]}
                    className="rounded-2xl bg-white/65 p-4"
                  >
                    <div className="flex justify-between">
                      <span className="font-semibold text-sm">
                        {review[0]}
                      </span>

                      <span className="text-xs font-semibold">
                        {review[2]}/10
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-black/55">
                      "{review[1]}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({
  l,
  v,
}: {
  l: string;
  v: string;
}) {
  return (
    <div className="rounded-2xl bg-white/70 p-3">
      <span className="block text-[10px] text-black/45">
        {l}
      </span>

      <span className="mt-1 block font-semibold">
        {v}
      </span>
    </div>
  );
}

/* =========================================================
   LIST PROPERTY
========================================================= */

function ListProperty({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="formShell shell max-w-[900px]">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm"
      >
        <ArrowRight
          className="rotate-180"
          size={16}
        />
        Home
      </button>

      <div className="mt-12">
        <p className="eyebrow">
          List a property
        </p>

        <h1 className="sectionTitle mt-3">
          Know a good stay?
          <br />
          Put it on PardesiHomes.
        </h1>

        <p className="mt-5 max-w-[620px] text-sm leading-6 text-black/55">
          Add a hostel, PG, flat or shared room
          around your university.
        </p>
      </div>

      <div className="glass mt-10 rounded-[30px] p-7 md:p-9">
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Property name"
            placeholder="e.g. Arihant Homes"
          />

          <Field
            label="Location"
            placeholder="e.g. Pondha, near Petrol Pump"
          />

          <Field
            label="Monthly rent"
            placeholder="₹10,000"
          />

          <Field
            label="Property type"
            placeholder="Hostel / PG / Flat / Shared Room"
          />

          <Field
            label="Food options"
            placeholder="Jain / Vegetarian / Non-Vegetarian"
          />

          <Field
            label="Distance from UPES"
            placeholder="e.g. 1.4 km"
          />

          <div className="md:col-span-2">
            <label className="mb-2 block text-xs font-semibold">
              Tell us why students should consider it
            </label>

            <textarea
              className="input min-h-32 resize-none"
              placeholder="Food, cleanliness, commute, amenities..."
            />
          </div>
        </div>

        <button
          onClick={onSubmit}
          className="mt-6 rounded-full bg-[#171614] px-6 py-3 text-sm text-white"
        >
          Submit property
          <Send
            className="ml-1 inline"
            size={14}
          />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <label>
      <span className="mb-2 block text-xs font-semibold">
        {label}
      </span>

      <input
        className="input"
        placeholder={placeholder}
      />
    </label>
  );
}

/* =========================================================
   ROOMMATE
========================================================= */

function Roommate({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="formShell shell max-w-[900px]">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm"
      >
        <ArrowRight
          className="rotate-180"
          size={16}
        />
        Home
      </button>

      <div className="mt-12">
        <p className="eyebrow">
          Need a roommate?
        </p>

        <h1 className="sectionTitle mt-3">
          Find someone who
          <br />
          fits your vibe.
        </h1>

        <p className="mt-5 max-w-[620px] text-sm leading-6 text-black/55">
          Tell us your campus, budget and
          preferences.
        </p>
      </div>

      <div className="glass mt-10 rounded-[30px] p-7 md:p-9">
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="University"
            placeholder="UPES"
          />

          <Field
            label="Budget per month"
            placeholder="₹8,000–₹12,000"
          />

          <Field
            label="Preferred area"
            placeholder="Pondha / Kandoli"
          />

          <Field
            label="Room preference"
            placeholder="Single / Shared"
          />

          <Field
            label="Food preference"
            placeholder="Jain / Vegetarian / Non-Vegetarian"
          />

          <Field
            label="Move-in date"
            placeholder="e.g. August 2026"
          />

          <div className="md:col-span-2">
            <label className="mb-2 block text-xs font-semibold">
              Anything important?
            </label>

            <textarea
              className="input min-h-32 resize-none"
              placeholder="Food preferences, study habits, move-in date..."
            />
          </div>
        </div>

        <button
          onClick={onSubmit}
          className="mt-6 rounded-full bg-[#171614] px-6 py-3 text-sm text-white"
        >
          Find my match
          <Users
            className="ml-1 inline"
            size={15}
          />
        </button>
      </div>
    </div>
  );
}