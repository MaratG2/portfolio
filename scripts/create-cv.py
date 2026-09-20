"""Build RU/EN CVs from the same approved public content as the website."""
from argparse import ArgumentParser
from pathlib import Path
from shutil import copyfile
from html import escape
import json
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak

parser = ArgumentParser()
parser.add_argument("--font-dir", type=Path, required=True)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
output = root / "output" / "pdf"
web = root / "public" / "cv"
output.mkdir(parents=True, exist_ok=True)
web.mkdir(parents=True, exist_ok=True)
content = json.loads((root / "app/_content/profile.json").read_text(encoding="utf-8"))
pdfmetrics.registerFont(TTFont("Arial", str(args.font_dir / "arial.ttf")))
pdfmetrics.registerFont(TTFont("Arial-Bold", str(args.font_dir / "arialbd.ttf")))
pdfmetrics.registerFontFamily("Arial", normal="Arial", bold="Arial-Bold")
ink = colors.HexColor("#173e32")
styles = {
    "name": ParagraphStyle("name", fontName="Arial-Bold", fontSize=25, leading=30, textColor=ink, spaceAfter=8),
    "role": ParagraphStyle("role", fontName="Arial-Bold", fontSize=14, leading=19, textColor=ink, spaceAfter=5),
    "sub": ParagraphStyle("sub", fontName="Arial", fontSize=10.5, leading=15, spaceAfter=13),
    "contact": ParagraphStyle("contact", fontName="Arial", fontSize=9, leading=14, spaceAfter=3),
    "body": ParagraphStyle("body", fontName="Arial", fontSize=10.3, leading=15.8, spaceAfter=7),
    "section": ParagraphStyle("section", fontName="Arial-Bold", fontSize=14, leading=20, textColor=ink, spaceBefore=15, spaceAfter=10, keepWithNext=True),
    "job": ParagraphStyle("job", fontName="Arial-Bold", fontSize=11, leading=16, textColor=ink, spaceAfter=4, keepWithNext=True),
    "date": ParagraphStyle("date", fontName="Arial", fontSize=9, leading=14, textColor=colors.HexColor("#51665b"), spaceAfter=7, keepWithNext=True),
}

def p(text, style="body", markup=False):
    text = text.replace("—", "-").replace("–", "-")
    return Paragraph(text if markup else escape(text), styles[style])

def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#d2d8ce"))
    canvas.line(43, 40, A4[0] - 43, 40)
    canvas.setFont("Arial", 8)
    canvas.setFillColor(ink)
    canvas.drawString(43, 26, f"{doc.author} | ML Engineer")
    canvas.drawRightString(A4[0] - 43, 26, str(doc.page))
    canvas.restoreState()

for lang, c in content.items():
    path = output / f"marat-gazizulin-cv-{lang}.pdf"
    doc = SimpleDocTemplate(str(path), pagesize=A4, leftMargin=43, rightMargin=43,
        topMargin=37, bottomMargin=55, title=f"{c['name']} - ML Engineer",
        author=c["name"], subject=c["specialization"], pageCompression=1)
    flow = [p(c["name"], "name"), p("ML Engineer", "role"), p(c["specialization"], "sub"),
        p('<link href="mailto:maratg2develop@gmail.com">maratg2develop@gmail.com</link> | +7 912 871-16-65', "contact", True),
        p('<link href="https://github.com/MaratG2">GitHub</link> | <link href="https://www.linkedin.com/in/maratg2/">LinkedIn</link> | <link href="https://t.me/maratg2">Telegram: @maratg2</link>', "contact", True),
        Spacer(1, 15), p(c["headline"]), p(c["introduction"]), p(c["experienceTitle"], "section")]
    for item in c["experience"][:3]:
        flow += [p(f'{item["company"]} | {item["role"]}', "job"), p(item["period"], "date"), p(item["description"]), Spacer(1, 5)]
    flow += [PageBreak(), p(c["name"], "name"), p("ML Engineer", "role"),
        p("Опыт и инженерная база" if lang == "ru" else "Experience & engineering foundation", "section")]
    for item in c["experience"][3:]:
        flow += [p(f'{item["company"]} | {item["role"]}', "job"), p(item["period"], "date"), p(item["description"])]
    flow += [p("Компетенции" if lang == "ru" else "Expertise", "section")]
    for skill in c["skills"]:
        flow += [p(skill["title"], "job"), p(skill["description"])]
    flow += [p(c["educationTitle"], "section"), p(c["education"]), p(c["course"]), p(c["languages"])]
    doc.build(flow, onFirstPage=footer, onLaterPages=footer)
    copyfile(path, web / path.name)
    print(path)
