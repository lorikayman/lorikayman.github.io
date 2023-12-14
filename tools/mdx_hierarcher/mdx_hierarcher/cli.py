from argparse import ArgumentParser

parser = ArgumentParser(
  prog='MDX Hierarcher',
  description='Format markdown entries to MDX',
)

parser.add_argument(
  '--root-dir',
  dest='root_dir',
  required=True,
  help="Relative path to the root directory containing markdown hierarchy",
)

parser.add_argument(
  '--output-dir',
  dest='output_dir',
  required=True,
  # default=None,
  help="Relative path to the output directory here MDXs will be placed",
)
