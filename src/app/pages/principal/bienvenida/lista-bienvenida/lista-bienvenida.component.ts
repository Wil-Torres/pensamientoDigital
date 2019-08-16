import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lista-bbienvenida',
  template: `
  <form novalidate [formGroup]="forma">
    <div [ngxSummernoteView]="forma.get('descripcionTarea').value"></div>
  </form>
  `,
  styles: []
})
export class ListaBienvenidaComponent implements OnInit {
  private _forma: FormGroup;

  public get forma(): FormGroup {
    return this._forma;
  }
  public set forma(v: FormGroup) {
    this._forma = v;
  }

  constructor(private builder: FormBuilder) {
    this._forma = this.builder.group({
      descripcionTarea: new FormControl(`
      <div class="max_user_content_width not_centered">
        <div class="materialStyle"><p><br>Appleton School District&nbsp;has opened its doors in 1990.&nbsp;Back then it was an Elementary School only. In 2000 the school expanded to cover also high school classes.&nbsp;Nowadays we proud ourselves with generations of brilliant students and an exceptional Hall of Fame with awards brought home by our athletics teams, Drama and Music Club and most recent one: our Chess Club (the National Cup just got here).<br><br></p>
      <h2>Mission</h2>
      <p>Diligent Excellence:&nbsp; Every Child, Every Day!&nbsp; By building and maintaining positive relationships with students, we collaboratively inspire, enable and empower students to achieve excellence through dynamic, engaging and rigorous learning experiences.&nbsp; We support each child “by name and by need” as we focus on the academic, social and economic needs of each student as they become lifelong learners and responsible, interculturally aware citizens in a global community.<span style="font-size: 12.0pt; line-height: 150%; font-family: 'Roboto Light';"><br><br></span></p>
      <p style="text-align: center;"><img src="/files/4271730/appleton-welcome_lmsauth_ab4f0ebd863e74322597850a7bf65c928329e3c3.png" alt="Welcome image of kids and teachers in a classroom" width="1000" style="max-width: 100%; margin: 10px 0;"><br><br></p>
      <h2>Values and Beliefs</h2>
      <p>Appleton School District holds that each and every child is capable of learning when we provide the time, expert educators, and a variety of ways in which each child will acquire and demonstrate new knowledge. Appleton School District School believes in working collaboratively with our colleagues, parents, FCPS specialists and community members to create a healthy and supportive learning environment through data-informed decision making, consideration of educational research and evidence, and implementation of best instructional practices.<br><br></p>
      <p>Appleton School District believes in holding high expectations for every child every day and by nurturing each student’s sense of belonging and ownership in our school.&nbsp; Mark Twain Middle School believes in celebrating the academic and behavioral successes of students as we lead them to be responsible citizens who will have a positive impact on the world.<br><br></p>
      <p>The curriculum was created by a team of experts at K12, using tried-and-true educational approaches for instruction. Our six core courses—Language Arts/English, Math, Science, History, Art, and Music—make for a rich full-time schooling option. The lesson plans for each subject are integrated, so your child may be reading literature from the same time period as the art or history lesson she is studying. What begins as a story about a king who lost his wife may end up with an examination of the architecture and history of the Taj Mahal, built as a monument to a dead queen.</p></div>
      </div>
      `),
    })
  }

  config: any = {
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr', 'div']]
    ]
  };

  ngOnInit() {
  }
  ngOnDestroy() {

  }

}