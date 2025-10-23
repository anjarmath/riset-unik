from transformers import AutoTokenizer, AutoModel
from optimum.onnxruntime import ORTModelForFeatureExtraction
from optimum.exporters.onnx import export
from pathlib import Path

model_name = "sentence-transformers/paraphrase-MiniLM-L6-v2"
onnx_dir = Path("onnx_model")
onnx_dir.mkdir(exist_ok=True)

print("Exporting model to ONNX...")
ort_model = ORTModelForFeatureExtraction.from_pretrained(model_name, export=True)
ort_model.save_pretrained(onnx_dir)
tokenizer = AutoTokenizer.from_pretrained(model_name)
tokenizer.save_pretrained(onnx_dir)
print("Export complete. Files saved in ./onnx_model")
