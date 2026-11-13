"""Check built internal page links and fragments without requesting external sites."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        if tag == 'a' and 'href' in attrs:
            self.links.append(attrs['href'])


root = Path('dist')
pages = {}
for file in root.rglob('*.html'):
    page = Page()
    page.feed(file.read_text())
    route = '/' + file.relative_to(root).as_posix().removesuffix('index.html')
    pages[route.rstrip('/') or '/'] = page
assert pages, 'Build the site before checking links.'
errors = []
count = 0
for route, page in pages.items():
    for href in page.links:
        url = urlsplit(href)
        if url.scheme or url.netloc:
            continue
        target = unquote(urljoin(route.rstrip('/') + '/', url.path)).rstrip('/') or '/'
        count += 1
        if target not in pages:
            if not (root / target.lstrip('/')).is_file():
                errors.append(f'{route}: missing target {href}')
        elif url.fragment and unquote(url.fragment) not in pages[target].ids:
            errors.append(f'{route}: missing anchor {href}')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'PASS: {count} internal links across {len(pages)} pages.')
