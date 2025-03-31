
import { Bot, BookOpen, Brain, CheckCircle, Chrome, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export function AetherInfoSection() {
  return (
    <section className="container mx-auto py-12 px-4 md:px-6">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-16">
        <Badge className="mb-4" variant="outline">
          AI-Powered Study Assistant
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Meet <span className="text-primary">AnswerRight</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          Your AI study companion that helps you learn faster, remember longer, and ace your exams with confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="gap-2">
            <Link href="https://chromewebstore.google.com/detail/answerright/gnlldhbpjicjidknchpfgmacdeclcdfj">
              <Chrome className="h-5 w-5" />
              Add to Chrome
            </Link>
          </Button>
          <Button asChild size="lg" className="gap-2" variant="outline">
            <Link href="/about">
              Learn More
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Brain className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Smart Studying</CardTitle>
              <CardDescription>Analyzes your learning patterns and adapts to your unique study style</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                AnswerRight uses advanced AI to understand how you learn best, then tailors its approach to match your
                cognitive style, making studying more efficient.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Sparkles className="h-10 w-10 text-primary mb-2" />
              <CardTitle>AI-Powered Answers</CardTitle>
              <CardDescription>Creates personalized answers from your study materials</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Simply upload your question by right-clicking selected text and AnswerRight will generate targeted
                answers to test your knowledge and reinforce learning.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Knowledge Gaps</CardTitle>
              <CardDescription>Identifies and fills gaps in your understanding</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                The extension tracks your performance and pinpoints areas where you need more practice, ensuring
                comprehensive mastery of your subject material.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <Tabs defaultValue="install" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="install">Install</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="learn">Learn</TabsTrigger>
          </TabsList>
          <TabsContent value="install" className="p-4">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="rounded-xl bg-muted/50 w-full md:w-1/2 aspect-video flex items-center justify-center">
                <Chrome className="h-16 w-16 text-muted-foreground" />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-xl font-semibold mb-2">1. Add to Chrome</h3>
                <p className="text-muted-foreground mb-4">
                  Install AnswerRight from the Chrome Web Store with just one click. The extension integrates seamlessly
                  with your browser.
                </p>
                <ul className="space-y-2">
                  {["Free to install", "No account required", "Works offline"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="upload" className="p-4">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="rounded-xl bg-muted/50 w-full md:w-1/2 aspect-video flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-muted-foreground" />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-xl font-semibold mb-2">2. Select the Text</h3>
                <p className="text-muted-foreground mb-4">
                  Highlight text, right-click on it, and select AnswerRight to send the question to the AI for an answer.
                </p>
                <ul className="space-y-2">
                  {["Quick", "Simple", "Secure and private"].map(
                    (item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="learn" className="p-4">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="rounded-xl bg-muted/50 w-full md:w-1/2 aspect-video flex items-center justify-center">
                <Brain className="h-16 w-16 text-muted-foreground" />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-xl font-semibold mb-2">3. Learn Effectively</h3>
                <p className="text-muted-foreground mb-4">
                  AnswerRight analyzes your materials and creates personalized quizzes, flashcards, and study guides
                  tailored to your learning style.
                </p>
                <ul className="space-y-2">
                  {["Adaptive learning algorithms", "Spaced repetition", "Progress tracking"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">What Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Alex Johnson",
              role: "Computer Science Student",
              image: "/placeholder.svg?height=40&width=40",
              quote:
                "AnswerRight helped me prepare for my algorithms exam in half the time. The answers provided were spot on!",
            },
            {
              name: "Sarah Chen",
              role: "Medical Student",
              image: "/placeholder.svg?height=40&width=40",
              quote:
                "As a med student, I have tons of material to memorize. This extension has been a lifesaver for anatomy and physiology.",
            },
            {
              name: "Marcus Williams",
              role: "Law Student",
              image: "/placeholder.svg?height=40&width=40",
              quote:
                "The way AnswerRight identifies gaps in my knowledge has dramatically improved my case study analyses.",
            },
          ].map((testimonial, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="italic">{`"${testimonial.quote}"`}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Ready to transform your studying experience?</CardTitle>
          <CardDescription className="text-center text-lg">
            Join thousands of students who are studying smarter, not harder.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="https://chromewebstore.google.com/detail/answerright/gnlldhbpjicjidknchpfgmacdeclcdfj">
              <Bot className="h-5 w-5" />
              Get AnswerRight Now
            </Link>
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          <p>Free for students • Works with Chrome</p>
        </CardFooter>
      </Card>

      <Separator className="my-16" />

      {/* FAQ Section */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              q: "Is AnswerRight free to use?",
              a: "Yes, AnswerRight is completely free for students.",
            },
            {
              q: "How does AnswerRight protect my privacy?",
              a: "Your study materials and data never leave your device. All AI processing happens locally, ensuring your information stays private.",
            },
            {
              q: "Does it work with all subjects?",
              a: "Yes! AnswerRight works with any subject matter, from STEM fields to humanities, languages, and professional certifications.",
            },
            {
              q: "Can I use it offline?",
              a: "Absolutely. Once installed, AnswerRight's core features work without an internet connection.",
            },
          ].map((faq, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

