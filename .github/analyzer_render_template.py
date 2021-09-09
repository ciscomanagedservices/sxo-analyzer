from jinja2 import Environment, FileSystemLoader
from os import path
from json import loads
import sys
import time

file_loader = FileSystemLoader(path.join(path.dirname(__file__),'templates'))
env = Environment(loader=file_loader)

template = env.get_template('ANALYZER_ISSUE_TEMPLATE.md')

with open(path.join(sys.argv[1],'.github','failed_issues.json')) as f:
    issues = loads(f.read())
with open(path.join(sys.argv[1],'.github','successes.json')) as f:
    successes = loads(f.read())
with open(path.join(sys.argv[1],'.github','warnings.json')) as f:
    warnings = loads(f.read())
with open(path.join(sys.argv[1],'.github','wf.json')) as f:
    wfs = loads(f.read()[:-1])
# issues = loads(sys.argv[1])

wf_analyzed = []
for wf in wfs:
    if issues.get(wf) != None or successes.get(wf) != None or warnings.get(wf) != None:
        wf_analyzed.append(wf)

no_issue = False
if len(wf_analyzed) == 0:
    no_issue = True
print(f'::set-output name=no_issue::${no_issue}')
# time.sleep(2)
# sys.exit(0)

close_issues = True
for wf in wfs:
    try:
        if len(issues[wf]) != 0 or len(warnings[wf]) != 0:
            close_issues = False
            break
    except KeyError:
        continue

print(f'::set-output name=close_issues::${close_issues}')
# print(wfs)
output = template.render(issues=issues, warnings=warnings, successes=successes, wfs=wfs, hash=sys.argv[2])

with open(path.join(path.dirname(__file__),'ISSUE.md'),'w', encoding="utf-8") as f:
    f.write(output)
