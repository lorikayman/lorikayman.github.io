from pathlib import Path

from .cli import parser
from .glob import Globber

def main():
    args = parser.parse_args()
    globber = Globber(
        Path().cwd() / args.root_dir,
        Path().cwd() / args.output_dir,
    )
    globber()
    globber.replace_wikilinks()
    globber.generate_js_imports()