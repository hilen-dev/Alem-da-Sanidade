pip install reportlab
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from report.lib.styles import getStampleStyleSheet
import json

with open("ficha.json", "r", encoding="utf-8")
as f:
  dados = json.load(f)

doc = SimpleDocTemplate("ficha.pdf")
styles = getSampleStyleSheet()

conteudo = []

conteudo.append(Paragraph("Ficha de Personagem", styles["Title"]))
conteudo.append(Spacer(1, 12))

for chave, valor in dados.itens():
  texto = f"<b>{chave}:</b>{valor}"
  conteudo.append(Paragraph(texto, styles["Normal"]))
  conteudo.append(Spacer(1, 8))

doc.build(conteudo)

print("PDF gerado")
