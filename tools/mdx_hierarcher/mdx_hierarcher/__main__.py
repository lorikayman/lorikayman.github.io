from pathlib import Path

from .cli import parser
from .glob import Globber

def main():
    args = parser.parse_args()
    whitelist = None
    if args.whitelist:
        whitelist = (Path().cwd() / args.whitelist)
    globber = Globber(
        Path().cwd() / args.root_dir,
        Path().cwd() / args.output_dir,
        whitelist,
    )
    globber()
    globber.replace_wikilinks()
    globber.generate_js_imports()